import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {FirebaseConfigService} from "../../../core/service/firebase-config.service";
import {User} from "../../../shared/model/User";
import {UserService} from "../../../shared/services/user.service";
/**
 * Created by Isaiah on 2017-02-06.
 */
@Injectable()
export class AdminUserService {

    private databaseRef = this.fire.database;
    private userRef = this.databaseRef.ref('/users');

    constructor(private fire: FirebaseConfigService, private userService: UserService) {
    }

    getAddedUsers(): Observable<any> {

        return Observable.create(obs => {

            this.userRef.on('child_added', user => {
                    const newUser = user.val() as User;
                    obs.next(newUser);
                },
                err => {
                    obs.throw(err);
                });
        });

    }

    getUpdatedUsers(): Observable<any> {

        return Observable.create(obs => {

            this.userRef.on('child_changed', user => {
                    const newUser = user.val() as User;
                    obs.next(newUser);
                },
                err => {
                    obs.throw(err);
                });
        });

    }

    getRemovedUsers(): Observable<any> {

        return Observable.create(obs => {

            this.userRef.on('child_removed', user => {
                    const newUser = user.val() as User;
                    obs.next(newUser);
                },
                err => {
                    obs.throw(err);
                });
        });

    }

    updateUser(user: User){
       this.userService.updateUser(user);
    }

    addUser(user: User, password: string){
        //name: string, email: string, password: string
       this.userService.register(user.name, user.email, password);
       this.userService.addUser(user);
    }

    deleteUser(user: User){
        this.userRef.child(user.uid).remove();
        this.fire.auth.currentUser.delete();
    }



}