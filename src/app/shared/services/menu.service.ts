import {Injectable, Input} from "@angular/core";
import {Observable} from "rxjs";
declare let $: any;
/**
 * Created by Isaiah on 2017-02-09.
 */

@Injectable()
export class MenuService {
    public isOpen: boolean;
    public menuSize: number;
    public static bookingPageSize: number = 60;
    public static accountPageSize: number = 45;
    public static defaultMenuSize: number = 35;

    constructor() {
        this.isOpen = false;
        this.detectScreenSizeChange();
    }

    public detectScreenSizeChange() {
        window.addEventListener('resize', () => {
            console.log('resizing occuring');
            console.log(window.innerWidth);
            console.log(window.outerWidth);
            if ((window.innerWidth <= 900) && (window.innerWidth >= 600)){
                if (this.isOpen){ this.setMenuSize(45)}
            }
            else if (window.innerWidth < 600) {
                this.menuSize = 100;
                if (this.isOpen){ this.setMenuSize(100)}
            } else {
                this.menuSize = 35;
                if (this.isOpen){ this.setMenuSize(35)}
            }
        })
    }


    public closeNav() {
        if (this.isOpen) {
                $('#overlay-content').fadeOut(100);
                $('#userName').fadeOut(100);
                $('#signOut').fadeOut(100);
                document.getElementById("my-menu-icon").classList.toggle("change");
                document.getElementById("wrapper").style.width = "100%";
                document.getElementById("myNav").style.width = "0%";
                this.isOpen = false;

        }
    }

    public openNav() {
        if (!this.isOpen) {
            $('#overlay-content').delay(150).fadeIn(600);
            $('#userName').delay(100).fadeIn(600);
            $('#signOut').delay(100).fadeIn(600);
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
            document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
            this.isOpen = true;
        }
    }

    public changeMenu() {
        if (this.isOpen) {
            this.closeNav();
        } else {
            this.openNav();
        }
    }

    private formatSize(x: number): string {
        return x + '%';
    }

    public setMenuSize(size) {
        this.menuSize = size;
        if (window.innerWidth < 600) {
            this.menuSize = 100;
        }
        document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
        document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
    }
}

