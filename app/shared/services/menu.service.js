"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
/**
 * Created by Isaiah on 2017-02-09.
 */
var MenuService = (function () {
    function MenuService() {
        this.isOpen = false;
        if ((window.innerWidth <= 900) && (window.innerWidth >= 600)) {
            this.menuSize = 45;
        }
        else if (window.innerWidth < 600) {
            this.menuSize = 100;
        }
        else {
            this.menuSize = MenuService.defaultMenuSize;
        }
        this.detectScreenSizeChange();
    }
    MenuService.prototype.detectScreenSizeChange = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            console.log('resizing occuring');
            console.log(window.innerWidth);
            console.log(window.outerWidth);
            if ((window.innerWidth <= 900) && (window.innerWidth >= 600)) {
                if (_this.isOpen) {
                    _this.setMenuSize(45);
                }
            }
            else if (window.innerWidth < 600) {
                _this.menuSize = 100;
                if (_this.isOpen) {
                    _this.setMenuSize(100);
                }
            }
            else {
                _this.menuSize = 35;
                if (_this.isOpen) {
                    _this.setMenuSize(35);
                }
            }
        });
    };
    MenuService.prototype.closeNav = function () {
        if (this.isOpen) {
            $('#overlay-content').fadeOut(100);
            $('#userName').fadeOut(100);
            $('#signOut').fadeOut(100);
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = "100%";
            document.getElementById("myNav").style.width = "0%";
            this.isOpen = false;
        }
    };
    MenuService.prototype.openNav = function () {
        if (!this.isOpen) {
            $('#overlay-content').delay(150).fadeIn(600);
            $('#userName').delay(100).fadeIn(600);
            $('#signOut').delay(100).fadeIn(600);
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
            document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
            this.isOpen = true;
        }
    };
    MenuService.prototype.changeMenu = function () {
        if (this.isOpen) {
            this.closeNav();
        }
        else {
            this.openNav();
        }
    };
    MenuService.prototype.formatSize = function (x) {
        return x + '%';
    };
    MenuService.prototype.setMenuSize = function (size) {
        this.menuSize = size;
        if (window.innerWidth < 600) {
            this.menuSize = 100;
        }
        document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
        document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
    };
    MenuService.bookingPageSize = 60;
    MenuService.accountPageSize = 45;
    MenuService.defaultMenuSize = 35;
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map