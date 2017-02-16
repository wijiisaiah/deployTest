import {Injectable} from "@angular/core";
/**
 * Created by Isaiah on 2017-02-09.
 */

@Injectable()
export class MenuService {
    public isOpen: boolean;
    public menuSize: number;

    constructor() {
        this.closeNav();
        this.isOpen = false;
        this.menuSize = 25;
    }


    public closeNav() {
        if (this.isOpen) {
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = "100%";
            document.getElementById("myNav").style.width = "0%";
            this.isOpen = false;
        }
    }

    public openNav() {
        if (!this.isOpen) {
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
            document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
            this.isOpen = true;
        }
    }

    public changeMenu(size?) {
        if (size) {
            this.menuSize = size;
            this.setMenuSize()
        }
        else {
            if (this.isOpen) {
                this.closeNav();
            } else {
                this.openNav();
            }
        }
    }

    private formatSize(x: number): string {
        return x + '%';
    }

    private setMenuSize() {
        document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
        document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
    }
}

