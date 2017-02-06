/**
 * Created by Isaiah on 2017-02-06.
 */

import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Rx";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.userService.isAuthenticated();
    }

}