import {Injectable} from "@angular/core";
/**
 * Created by Isaiah on 2017-02-09.
 */

@Injectable()
export class MenuService {

    public closeNav() {
        document.getElementById("my-menu-icon").classList.toggle("change");
        document.getElementById("wrapper").style.width = "100%";
        document.getElementById("myNav").style.width = "0%";
        console.log('close')
    }
    public openNav(){
        document.getElementById("my-menu-icon").classList.toggle("change");
        document.getElementById("wrapper").style.width = "25%";
        document.getElementById("myNav").style.width = "75%";
        console.log('open');
    }

    public changeMenu() {
        let that = this;
        if (document.getElementById("myNav").style.width == "75%") {
            that.closeNav();
        } else {
            this.openNav();
        }
    }
}

