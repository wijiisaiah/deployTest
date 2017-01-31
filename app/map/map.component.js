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
var user_authentication_service_1 = require("../users/services/user-authentication.service");
var MapComponent = (function () {
    function MapComponent(uas) {
        this.uas = uas;
    }
    MapComponent.prototype.ngOnInit = function () {
        var testParking = new parkingStation_1.ParkingStation('UBC Sub', '606 Something drive', 'MazDome', 49.2827, -123.1207, 100, true);
        var testParking2 = new parkingStation_1.ParkingStation('UBC asdf', '606 asdf drive', 'MazDome', 49.2727, -123.1207, 100, true);
        this.parkingStations = [testParking, testParking2];
        this.markers = [];
        this.infowindows = [];
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
        // Creating marker
        var that = this;
        var marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title
        });
        // Creating Info Window which is related to this Parking Station
        var infowindow = new google.maps.InfoWindow({
            content: "\n        <div id=\"infoWindow\">\n             <h3>" + parking.title + "</h3><br>\n             <p> Address: " + parking.address + "<br>\n                 Type: " + parking.type + " <br>\n                 Size: " + parking.size + "\n             </p>\n            <div class=\"col-sm-9 offset-sm-3\"></div>\n        </div>\n        <button class=\"btn btn-info\" onclick=\"\">Reserve</button>",
        });
        // Pushes the newly created Info Window to the array of info windows
        this.infowindows.push(infowindow);
        // Listener made to open InfoWindow when user clicks on a marker
        marker.addListener('click', function () {
            // Closes all Info Windows before opening new one
            for (var i = 0; i < that.infowindows.length; i++) {
                that.infowindows[i].close();
            }
            infowindow.open(this.map, marker);
        });
        // Closes the info window if a click occurs on the map
        this.map.addListener('click', function () {
            infowindow.close(this.map, marker);
        });
        return marker;
    };
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-map',
            templateUrl: 'map.component.html',
            styleUrls: ['map.component.css']
        }), 
        __metadata('design:paramtypes', [user_authentication_service_1.UserAuthenticationService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map