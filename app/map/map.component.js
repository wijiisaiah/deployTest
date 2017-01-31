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
var core_1 = require('@angular/core');
var parkingStation_1 = require("../model/parkingStation");
var MapComponent = (function () {
    function MapComponent() {
        this.testParking = new parkingStation_1.ParkingStation('testParking', 'UBC drive', 49.2827, -123.1207, 100, true);
    }
    MapComponent.prototype.ngOnInit = function () {
        this.parkingStations = [this.testParking];
        this.markers = [];
        this.createMap();
        this.assignMarkersToParking();
    };
    MapComponent.prototype.createMap = function () {
        var mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    };
    MapComponent.prototype.assignMarkersToParking = function () {
        for (var _i = 0, _a = this.parkingStations; _i < _a.length; _i++) {
            var parking = _a[_i];
            this.markers.push(this.createMarker(parking));
        }
    };
    MapComponent.prototype.setMarkersToMap = function () {
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var marker = _a[_i];
            marker.setMap(this.map);
        }
    };
    MapComponent.prototype.createMarker = function (parking) {
        var marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title
        });
        var infowindow = new google.maps.InfoWindow({
            content: this.makeHTMLforInfoWindow(parking)
        });
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
        return marker;
    };
    MapComponent.prototype.makeHTMLforInfoWindow = function (parking) {
        var title = parking.title;
        var HTML = "\n            <div id=\"infoWindow\">\n                <h1></h1>\n            </div>\n";
        return HTML;
    };
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-map',
            templateUrl: 'map.component.html',
            styleUrls: ['map.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map