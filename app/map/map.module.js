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
/**
 * Created by Isaiah on 2017-01-31.
 */
// Modules
var core_1 = require('@angular/core');
// Components
var map_component_1 = require("./map.component");
var menu_component_1 = require("../menu/menu.component");
var platform_browser_1 = require("@angular/platform-browser");
// Services
var MapModule = (function () {
    function MapModule() {
    }
    MapModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [
                map_component_1.MapComponent,
                menu_component_1.MenuComponent
            ],
            exports: [map_component_1.MapComponent],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], MapModule);
    return MapModule;
}());
exports.MapModule = MapModule;
//# sourceMappingURL=map.module.js.map