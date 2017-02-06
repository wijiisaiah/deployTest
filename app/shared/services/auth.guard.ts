/**
 * Created by Isaiah on 2017-02-06.
 */

import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Rx";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(this.userService.isAuthenticated());
        if (!this.userService.isAuthenticated()){
            this.router.navigate(['/login']);
            return false;
        } else{
            return true;
        }
    }

}