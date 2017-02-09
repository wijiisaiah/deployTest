///<reference path="../menu/menu.component.ts"/>
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
        this.bookingService.createBooking(this.selectedParkingStation); //create a booking (user -> current booking)
        console.log("Current booking created");
    };
    MapComponent.prototype.completeEventListener = function (event) {
        console.log(event.detail);
        var currentBooking = new booking_1.Booking(null, null, null, null);
        //get the current booking from Firebase and set it to currentBooking
        this.bookingService.getCurrentBooking()
            .subscribe(function (booking) {
            currentBooking = booking;
        }, function (err) {
            console.error("Unable to get current booking", err);
        });
        console.log("Current booking retrieved", currentBooking);
        //update currentBooking with end time and cost
        this.bookingService.updateCurrentBooking(currentBooking);
        console.log("CurrentBooking updated", currentBooking);
        console.log("Parking station: ", currentBooking.parkingStation);
        this.bookingService.addBooking(currentBooking);
        console.log("Current booking added to bookings");
        this.bookingService.removeCurrentBooking();
        console.log("Current booking removed");
    };
    MapComponent.prototype.ngOnInit = function () {
        // let testParking: ParkingStation = new ParkingStation('Mazdis - UBC Sub', '606 Something drive', 'MazDome', 49.2827, -123.1207, 100, 100, true, 100);
        // let testParking2: ParkingStation = new ParkingStation('Mazdis - Waterfront', '601 W Cordova St', 'MazDome', 49.2860, -123.1117, 100, 100, true, 100);
        // this.getAddedParkingStations();
        // this.parkingStations = [testParking, testParking2];
        this.markers = [];
        this.infowindows = [];
        this.createMap();
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
    };
    MapComponent.prototype.getAddedParkingStations = function () {
        var _this = this;
        this.parkingService.getAddedParkingStations()
            .subscribe(function (parkingStation) {
            _this.parkingStations.push(parkingStation);
            _this.assignMarkersToParking();
        }, function (err) {
            console.error("Unable to get added booking - ", err);
        });
    };
    MapComponent.prototype.getUpdatedParkingStations = function () {
        var _this = this;
        this.parkingService.getUpdatedParkingStation()
            .subscribe(function (updatedParkingStation) {
            var parkingIndex = _this.parkingStations.map(function (index) { return index.title; }).indexOf(updatedParkingStation['title']);
            _this.parkingStations[parkingIndex] = updatedParkingStation;
            console.log("Update works: ", _this.parkingStations);
            console.log(updatedParkingStation);
            console.log(_this.parkingStations[parkingIndex]);
            var markerIndex = _this.markers.map(function (index) { return index.title; }).indexOf(updatedParkingStation['title']);
            _this.assignMarkersToParking();
        }, function (err) {
            console.log("Unable to get updated bug - ", err);
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
    MapComponent.prototype.assignMarkersToParking = function () {
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var marker = _a[_i];
            marker.setMap(null);
        }
        this.markers = [];
        for (var _b = 0, _c = this.parkingStations; _b < _c.length; _b++) {
            var parking = _c[_b];
            this.markers.push(this.createMarker(parking));
        }
        console.log(this.markers);
    };
    MapComponent.prototype.setMarkersToMap = function () {
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var marker = _a[_i];
            marker.setMap(this.map);
        }
    };
    MapComponent.prototype.createMarker = function (parking) {
        console.log('creating marker', parking);
        // Creating marker
        var that = this;
        // Creating Info Window which is related to this Parking Station
        var infowindow = new google.maps.InfoWindow({
            content: this.getHTMLcontent(parking),
        });
        var marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title,
            parking: parking,
            infowindow: infowindow
        });
        // function myFunction(){
        //     console.log('reserve');
        // }
        // Pushes the newly created Info Window to the array of info windows
        this.infowindows.push(infowindow);
        // Listener made to open InfoWindow when user clicks on a marker
        marker.addListener('click', function () {
            document.getElementById('myNav').style.width = "0";
            // Closes all Info Windows before opening new one
            for (var i = 0; i < that.infowindows.length; i++) {
                that.infowindows[i].close();
            }
            infowindow.open(this.map, marker);
            that.selectedParkingStation = parking;
        });
        // Closes the info window if a click occurs on the map
        this.map.addListener('click', function () {
            this.menuService.changeMenu();
            infowindow.close(this.map, marker);
        });
        return marker;
    };
    MapComponent.prototype.updateMarker = function (marker, parking) {
        console.log(marker);
        marker.getAttribute['parking'] = parking;
        marker.getAttribute['infowindow'].content = this.getHTMLcontent(parking);
    };
    MapComponent.prototype.getHTMLcontent = function (parking) {
        return "\n                <head>\n                   <script>\n                        function myFunction(){\n                            console.log('message');\n                        }\n                    </script>\n                </head>\n                <body>\n                    <div id=\"infoWindow\">\n                     <h3>" + parking.title + "</h3><br>\n                     <p> Address: " + parking.address + "<br>\n                         Type: " + parking.type + " <br>\n                         Size: " + parking.size + "<br>\n                         Availabiliy: " + parking.availableSpots + "/" + parking.size + "<br>\n                         Rate: " + parking.rate + " \n                     </p>\n                     <br>\n                    <button class=\"btn btn-info\" onclick='window.dispatchEvent(new CustomEvent(\"reserve\", {detail: \"Reservation Started\"}));'>Reserve</button>\n                    <button class=\"btn btn-info\" onclick='window.dispatchEvent(new CustomEvent(\"complete\", {detail: \"End Booking\"}));'>Complete</button>\n                </div>\n                </body>\n                  ";
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