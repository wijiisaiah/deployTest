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
        this.menuSize = 25;
    }
    MenuService.prototype.closeNav = function () {
        if (this.isOpen) {
            document.getElementById("my-menu-icon").classList.toggle("change");
            document.getElementById("wrapper").style.width = "100%";
            document.getElementById("myNav").style.width = "0%";
            this.isOpen = false;
        }
    };
    MenuService.prototype.openNav = function () {
        document.getElementById("my-menu-icon").classList.toggle("change");
        document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
        document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
        this.isOpen = true;
    };
    MenuService.prototype.changeMenu = function (size) {
        if (size) {
            this.menuSize = size;
            this.setMenuSize();
        }
        else {
            if (this.isOpen) {
                this.closeNav();
            }
            else {
                this.openNav();
            }
        }
    };
    MenuService.prototype.formatSize = function (x) {
        return x + '%';
    };
    MenuService.prototype.setMenuSize = function () {
        document.getElementById("wrapper").style.width = this.formatSize(100 - this.menuSize);
        document.getElementById("myNav").style.width = this.formatSize(this.menuSize);
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map