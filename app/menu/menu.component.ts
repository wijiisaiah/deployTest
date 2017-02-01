/**
 * Created by Isaiah on 2017-01-31.
 */
import {Component, AfterViewInit, OnInit} from '@angular/core';
import {MapComponent} from "../map/map.component";
import {UserAuthenticationService} from "../users/services/user-authentication.service";
import {User} from "../users/model/user";



@Component({
    moduleId: module.id,
    selector: 'user-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent {

    private currentUser = this.uas.currentUser;
    constructor(private uas: UserAuthenticationService){
    }


    /* Close when someone clicks on the "x" symbol inside the overlay */
    public closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }


}