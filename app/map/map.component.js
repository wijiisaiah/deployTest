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
var parkingStation_service_1 = require('./../shared/services/parkingStation.service');
var core_1 = require('@angular/core');
var user_service_1 = require("../shared/services/user.service");
var booking_service_1 = require("../shared/services/booking.service");
var booking_1 = require("../shared/model/booking");
var router_1 = require("@angular/router");
var menu_service_1 = require("../shared/services/menu.service");
var MapComponent = (function () {
    function MapComponent(bookingService, userService, parkingService, router, menuService) {
        this.bookingService = bookingService;
        this.userService = userService;
        this.parkingService = parkingService;
        this.router = router;
        this.menuService = menuService;
        this.parkingStations = [];
    }
    MapComponent.prototype.reserveEventListener = function (event) {
        console.log(event.detail);
        this.closeInfoWindows();
        this.bookingService.createBooking(this.selectedParkingStation); //create a booking (user -> current booking)
        console.log("Current booking created");
    };
    MapComponent.prototype.completeEventListener = function (event) {
        console.log(event.detail);
        this.closeInfoWindows();
        var currentBooking = new booking_1.Booking(null, null, null, null);
        //get the current booking from Firebase and set it to currentBooking
        this.bookingService.getCurrentBooking()
            .subscribe(function (booking) {
            currentBooking = booking;
        }, function (err) {
            console.error("Unable to get current booking", err);
        });
        // console.log("Current booking retrieved", currentBooking);
        //update currentBooking with end time and cost
        this.bookingService.completeBooking(currentBooking);
    };
    MapComponent.prototype.ngOnInit = function () {
        this.markers = [];
        this.infowindows = [];
        this.createMap();
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
        var that = this;
        this.map.addListener('click', function () {
            that.menuService.closeNav();
        });
    };
    MapComponent.prototype.getAddedParkingStations = function () {
        var _this = this;
        this.parkingService.getAddedParkingStations()
            .subscribe(function (parkingStation) {
            _this.parkingStations.push(parkingStation);
            _this.markers.push(_this.createMarker(parkingStation));
        }, function (err) {
            console.error("Unable to get added parking station - ", err);
        });
    };
    MapComponent.prototype.getUpdatedParkingStations = function () {
        var _this = this;
        this.parkingService.getUpdatedParkingStation()
            .subscribe(function (updatedParkingStation) {
            var parkingIndex = _this.parkingStations.map(function (index) { return index.title; }).indexOf(updatedParkingStation['title']);
            _this.parkingStations[parkingIndex] = updatedParkingStation;
            console.log("Update works: ", _this.parkingStations);
            _this.updateMarker(updatedParkingStation);
        }, function (err) {
            console.log("Unable to get updated parking station - ", err);
        });
    };
    MapComponent.prototype.createMap = function () {
        var mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    };
    // private assignMarkersToParking() {
    //     for (let marker of this.markers) {
    //         marker.setMap(null);
    //     }
    //     for (let parking of this.parkingStations) {
    //         this.markers.push(this.createMarker(parking))
    //     }
    //     console.log(this.markers);
    //
    // }
    //
    // private setMarkersToMap() {
    //     for (let marker of this.markers) {
    //         marker.setMap(this.map);
    //     }
    // }
    MapComponent.prototype.updateMarker = function (parking) {
        var that = this;
        var valid = parking.availableSpots > 0;
        var content = this.getHTMLcontent(parking, valid);
        this.closeInfoWindows();
        var icon;
        if (valid) {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        }
        else {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var marker = _a[_i];
            for (var _b = 0, _c = this.infowindows; _b < _c.length; _b++) {
                var infoWindow = _c[_b];
                if (infoWindow.title === marker.title) {
                    console.log(infoWindow);
                    infoWindow.setContent(content);
                }
            }
            if (marker.title === parking.title) {
                marker.setMap(null);
                console.log(marker);
                console.log(marker.icon);
                marker.icon = icon;
                marker.setMap(that.map);
            }
        }
        console.log("number of markers: ", this.markers);
    };
    MapComponent.prototype.createMarker = function (parking) {
        console.log('creating marker', parking);
        // Creating marker
        var that = this;
        var icon;
        var valid = parking.availableSpots > 0;
        if (valid) {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        }
        else {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        var marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title,
            icon: icon
        });
        var content = this.getHTMLcontent(parking, valid);
        // Creating Info Window which is related to this Parking Station
        var infowindow = new google.maps.InfoWindow({
            title: marker.title,
            content: content
        });
        // Pushes the newly created Info Window to the array of info windows
        this.infowindows.push(infowindow);
        // Listener made to open InfoWindow when user clicks on a marker
        marker.addListener('click', function () {
            that.menuService.closeNav();
            // Closes all Info Windows before opening new one
            that.closeInfoWindows();
            infowindow.open(this.map, marker);
            that.selectedParkingStation = parking;
        });
        // Closes the info window if a click occurs on the map
        this.map.addListener('click', function () {
            infowindow.close(this.map, marker);
        });
        return marker;
    };
    MapComponent.prototype.closeInfoWindows = function () {
        for (var i = 0; i < this.infowindows.length; i++) {
            this.infowindows[i].close();
        }
    };
    MapComponent.prototype.getHTMLcontent = function (parking, valid) {
        var html;
        if (valid) {
            html = "\n                <body>\n                    <div id=\"infoWindow\">\n                     <h3>" + parking.title + "</h3><br>\n                     <p> Address: " + parking.address + "<br>\n                         Type: " + parking.type + " <br>\n                         Size: " + parking.size + "<br>\n                         Availabiliy: " + parking.availableSpots + "/" + parking.size + "<br>\n                         Rate: " + parking.rate + " \n                     </p>\n                     <br>\n                    <button class=\"btn btn-info\" onclick='window.dispatchEvent(new CustomEvent(\"reserve\", {detail: \"Reservation Started\"}));'>Reserve</button>\n                    <button class=\"btn btn-info\" onclick='window.dispatchEvent(new CustomEvent(\"complete\", {detail: \"End Booking\"}));'>Complete</button>\n                </div>\n                </body>\n                  ";
        }
        else {
            html = "\n                <body>\n                    <div id=\"infoWindow\">\n                     <h3>" + parking.title + "</h3><br>\n                     <p> Address: " + parking.address + "<br>\n                         Type: " + parking.type + " <br>\n                         Size: " + parking.size + "<br>\n                         Availabiliy: " + parking.availableSpots + "/" + parking.size + "<br>\n                         Rate: " + parking.rate + " \n                     </p>\n                     <br>\n                    <button class=\"btn btn-info\" onclick='window.dispatchEvent(new CustomEvent(\"complete\", {detail: \"End Booking\"}));'>Complete</button>\n                </div>\n                </body>\n                  ";
        }
        return html;
    };
    __decorate([
        core_1.HostListener('window:reserve', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapComponent.prototype, "reserveEventListener", null);
    __decorate([
        core_1.HostListener('window:complete', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapComponent.prototype, "completeEventListener", null);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-map',
            template: '<user-menu></user-menu><div id="googleMap"></div>',
            styles: ["\n    #googleMap {\n        width: 100%;\n        height:100%;\n        padding: 0;\n         }\n"]
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService, user_service_1.UserService, parkingStation_service_1.ParkingService, router_1.Router, menu_service_1.MenuService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map