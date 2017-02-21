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
var email_service_1 = require("../shared/services/email.service");
var booking_service_1 = require("../shared/services/booking.service");
var router_1 = require("@angular/router");
var menu_service_1 = require("../shared/services/menu.service");
var MapComponent = (function () {
    function MapComponent(bookingService, userService, parkingService, emailService, router, menuService) {
        this.bookingService = bookingService;
        this.userService = userService;
        this.parkingService = parkingService;
        this.emailService = emailService;
        this.router = router;
        this.menuService = menuService;
        this.reserveEndTime = null;
        this.parkingStations = [];
        this.markers = [];
        this.subscriptions = [];
    }
    MapComponent.prototype.parkBikeListener = function (event) {
        this.reserveEndTime = null;
        this.bookingService.updateCurrentBooking(this.currentBooking);
        this.closeInfoWindows();
        clearInterval(this.timeOut);
        document.getElementById('timer').innerText = '';
    };
    MapComponent.prototype.reserveEventListener = function (event) {
        if (!this.currentBooking) {
            this.closeInfoWindows();
            this.bookingService.createBooking(this.selectedParkingStation); //create a booking (user -> current booking)
        }
        else {
            alert('Cannot have more than 1 reservation at a time');
        }
    };
    MapComponent.prototype.cancelEventListener = function (event) {
        this.bookingService.cancelBooking(this.currentBooking);
        this.currentBooking = undefined;
        this.closeInfoWindows();
        clearInterval(this.timeOut);
        document.getElementById('timer').innerText = '';
    };
    MapComponent.prototype.completeEventListener = function (event) {
        this.closeInfoWindows();
        this.bookingService.completeBooking(this.currentBooking);
    };
    /* Upon destruction of Map:
     *  - unsubs from all subscriptions
     *  - clears the timeOut interval for timer
     */
    MapComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
        clearInterval(this.timeOut);
    };
    /* Upon Initialization of Map:
     *  - Creates empty array of markers and infoWindows
     *  - Initializes subscriptions to user location, current booking, parkstations etc.
     *  - Initializes map
     *  - Also adds a listener to whole map in order to close menu when any click occurs
     */
    MapComponent.prototype.ngOnInit = function () {
        this.markers = [];
        this.infowindows = [];
        this.createMap();
        this.markerCluster = new MarkerClusterer(this.map, this.markers, { imagePath: MapComponent.markerClusterImages });
        this.getCurrentLocation();
        this.getCurrentBooking();
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
        this.setUserLocation();
        this.getReservationTimer();
        var that = this;
        var mapDiv = document.getElementById('googleMap');
        this.map.addListener('click', function () {
            that.menuService.closeNav();
        });
    };
    /* Subscribe to the user's current location */
    MapComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        var temp = this.userService.getCurrentLocation()
            .subscribe(function (pos) {
            _this.userLocation = pos;
        });
        this.subscriptions.push(temp);
    };
    /* If a reservation exists, runs a script every 1 second that calculates
     the time remaining for the reservation before it automatically cancels
     */
    MapComponent.prototype.getReservationTimer = function () {
        var _this = this;
        var that = this;
        var temp = this.bookingService.getReservationTimer()
            .subscribe(function (endTime) {
            if (endTime !== undefined) {
                that.reserveEndTime = endTime;
                that.timeOut = setInterval(function () {
                    var that = _this;
                    var remaining = Math.max(0, that.reserveEndTime - new Date().getTime());
                    var minutes = Math.floor((remaining / 1000) / 60);
                    var seconds = (Math.round((remaining / 1000)) % 60).toString();
                    if (seconds.length < 2) {
                        seconds = "0" + seconds;
                    }
                    document.getElementById('timer').innerText = minutes + ':' + seconds;
                    if (that.reserveEndTime <= new Date().getTime() && that.reserveEndTime !== null) {
                        _this.reserveEndTime = null;
                        _this.bookingService.cancelBooking(_this.currentBooking);
                        _this.currentBooking = undefined;
                        _this.closeInfoWindows();
                    }
                }, 1000);
            }
            else {
                that.reserveEndTime = null;
            }
        });
        this.subscriptions.push(temp);
    };
    /* Subscribes to users current booking, updates marker upon receiving a booking */
    MapComponent.prototype.getCurrentBooking = function () {
        var _this = this;
        var temp = this.bookingService.getCurrentBooking()
            .subscribe(function (booking) {
            _this.currentBooking = booking;
            if (booking) {
                for (var _i = 0, _a = _this.parkingStations; _i < _a.length; _i++) {
                    var ps = _a[_i];
                    if (ps.title === booking.parkingStation.title) {
                        booking.parkingStation = ps;
                    }
                }
                _this.updateMarker(booking.parkingStation);
            }
        }, function (err) {
            console.error("Unable to get current booking -", err);
        });
        this.subscriptions.push(temp);
    };
    /* Subscribes to added parking stations (mainly for initialization)
     * - Pushes the added station to parkingStations array
     * - Creates a new marker and push it to marker array
     */
    MapComponent.prototype.getAddedParkingStations = function () {
        var _this = this;
        var temp = this.parkingService.getAddedParkingStations()
            .subscribe(function (parkingStation) {
            _this.parkingStations.push(parkingStation);
            var marker = _this.createMarker(parkingStation);
            _this.markers.push(marker);
            _this.markerCluster.addMarker(_this.markers[_this.markers.length - 1]);
        }, function (err) {
            console.error("Unable to get added parking station - ", err);
        });
        this.subscriptions.push(temp);
    };
    /* Subscribes to changes in parking stations, when stations are changed, markers are updated */
    MapComponent.prototype.getUpdatedParkingStations = function () {
        var _this = this;
        var temp = this.parkingService.getUpdatedParkingStation()
            .subscribe(function (updatedParkingStation) {
            var parkingIndex = _this.parkingStations.map(function (index) { return index.title; }).indexOf(updatedParkingStation['title']);
            _this.parkingStations[parkingIndex] = updatedParkingStation;
            _this.updateMarker(updatedParkingStation);
        }, function (err) {
            console.error("Unable to get updated parking station - ", err);
        });
        this.subscriptions.push(temp);
    };
    /* Initializes the google maps api with specific settings */
    MapComponent.prototype.createMap = function () {
        var mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            clickableIcons: false
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    };
    /* Updates the marker assigned to 'parking'
     * - Sets the correct icon depending on:
     *      - Whether or not parking station is available
     *      - If current booking exists
     * - Changes content in HTML to match:
     *      - Availibility
     *      - Spaces available
     */
    MapComponent.prototype.updateMarker = function (parking) {
        var that = this;
        var valid = parking.availableSpots > 0;
        var content = this.getHTMLcontent(parking, valid);
        this.closeInfoWindows();
        var icon = this.getProperIcon(parking, valid);
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var marker = _a[_i];
            if (marker.title === parking.title) {
                for (var _b = 0, _c = this.infowindows; _b < _c.length; _b++) {
                    var infoWindow = _c[_b];
                    if (infoWindow.title === marker.title) {
                        infoWindow.setContent(content);
                    }
                }
                marker.setMap(null);
                marker.icon = icon;
                marker.setMap(that.map);
            }
        }
        console.log("number of markers: ", this.markers);
    };
    /* Creates a marker to be assigned to a parking station
     * - Determines correct icon to set depending on validity and current booking
     * - Creates a marker and sets its title/position/icon
     * - Sets Content and addes event listeners to open and close windows on user clicks
     */
    MapComponent.prototype.createMarker = function (parking) {
        // Creating marker
        var that = this;
        var valid = parking.availableSpots > 0;
        var icon = this.getProperIcon(parking, valid);
        var marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title,
            icon: icon
        });
        var content = this.getHTMLcontent(parking, valid);
        // Creating Info Window which is related to this Parking Station
        var infowindow = new InfoBubble({
            map: this.map,
            maxWidth: 500,
            minWidth: 300,
            maxHeight: 276,
            minHeight: 275,
            content: this.getHTMLcontent(parking, valid),
            borderColor: 'rgba(31, 138, 220, 0.8)',
            backgroundColor: 'rgba(31, 138, 220, 0.8)',
            borderRadius: 0,
            hideCloseButton: true,
            title: parking.title
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
    /* Closes all infoWindows */
    MapComponent.prototype.closeInfoWindows = function () {
        for (var i = 0; i < this.infowindows.length; i++) {
            this.infowindows[i].close();
        }
    };
    /* Does a lot of stuff */
    MapComponent.prototype.setUserLocation = function () {
        var that = this;
        var controlDiv = document.createElement('div');
        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);
        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);
        google.maps.event.addListener(that.map, 'dragend', function () {
            $('#you_location_img').css('background-position', '0px 0px');
        });
        firstChild.addEventListener('click', function () {
            if (that.userLocationMarker) {
                that.userLocationMarker.setMap(null);
            }
            var imgX = '0';
            var animationInterval = setInterval(function () {
                if (imgX == '-18')
                    imgX = '0';
                else
                    imgX = '-18';
                $('#you_location_img').css('background-position', imgX + 'px 0px');
            }, 500);
            if (that.userLocation) {
                var latlng = { lat: that.userLocation.coords.latitude, lng: that.userLocation.coords.longitude };
                that.userLocationMarker = new google.maps.Marker({
                    position: latlng,
                    icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
                });
                that.userLocationMarker.setMap(that.map);
                that.map.setCenter(latlng);
                that.map.setZoom(14);
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '-144px 0px');
            }
            else {
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '0px 0px');
            }
        });
        controlDiv.tabIndex = 1;
        that.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    };
    MapComponent.prototype.getProperIcon = function (parking, valid) {
        var icon;
        if (valid) {
            icon = MapComponent.availableParkingIcon;
        }
        else {
            icon = MapComponent.unavailableParkingIcon;
        }
        if (this.currentBooking !== undefined) {
            if (this.currentBooking.parkingStation.title === parking.title) {
                icon = MapComponent.bookedParkingIcon;
                if (this.reserveEndTime !== null) {
                    icon = MapComponent.reservedParkingIcon;
                }
            }
        }
        return icon;
    };
    MapComponent.prototype.updateClusters = function () {
        var markerCluster = new MarkerClusterer(this.map, this.markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    };
    /* Kind of unnecessary */
    MapComponent.prototype.handleLocationError = function () {
        console.log('no access to geolocation');
    };
    /* Sets HTML content to 'parking' fields
     * Determines buttons to place depending on state of current booking
     */
    MapComponent.prototype.getHTMLcontent = function (parking, valid) {
        var buttons;
        if (valid) {
            buttons = "<button class=\"btn btn-success\" onclick='window.dispatchEvent(new CustomEvent(\"reserve\", {detail: \"Reservation Started\"}));'>Reserve</button>";
        }
        else {
            buttons = "<p>Module is Full</p>";
        }
        if (this.currentBooking !== undefined) {
            if (this.currentBooking.parkingStation.title === parking.title) {
                buttons = "<button class=\"btn btn-success\" onclick='window.dispatchEvent(new CustomEvent(\"complete\", {detail: \"End Booking\"}));'>Retrieve Bike</button>";
                if (this.reserveEndTime !== null) {
                    buttons = "<button class=\"btn btn-warning\" onclick='window.dispatchEvent(new CustomEvent(\"parkBike\", {detail: \"Park Bike\"}));'>Park Bike</button>\n                        <button class=\"btn btn-danger\" onclick='window.dispatchEvent(new CustomEvent(\"cancel\", {detail: \"Cancel Booking\"}));'>Cancel</button>";
                }
            }
        }
        return "    <head>\n            <style>\n                h4 {\n                    color: white;\n                }\n                p {\n                    color: white;\n                    font-size: 15px;\n                }\n                .btn {\n                    align-content: right;\n                    border-radius: 0;\n                }                \n            </style>\n        </head>\n                    <body>\n                     <div >\n                     <h4>" + parking.title + "</h4><br>\n                     <p> \n                         Address: " + parking.address + "<br>\n                         Type: " + parking.type + " <br>\n                         Size: " + parking.size + "<br>\n                         Availability: " + parking.availableSpots + "/" + parking.size + "<br>\n                         Rate: " + parking.rate + " \n                     </p>\n                     <br>\n                     " + buttons + "\n                     </div>\n                     </body>\n                  ";
    };
    MapComponent.availableParkingIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    MapComponent.unavailableParkingIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    MapComponent.bookedParkingIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    MapComponent.reservedParkingIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    MapComponent.markerClusterImages = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
    __decorate([
        core_1.HostListener('window:parkBike', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapComponent.prototype, "parkBikeListener", null);
    __decorate([
        core_1.HostListener('window:reserve', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapComponent.prototype, "reserveEventListener", null);
    __decorate([
        core_1.HostListener('window:cancel', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MapComponent.prototype, "cancelEventListener", null);
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
            template: "\n    <div id=\"timer\"></div>\n    <user-menu></user-menu> \n    <div id=\"googleMap\"></div>\n    ",
            styles: ["\n    #googleMap {\n        width: 100%;\n        height:100%;\n        padding: 0;\n         }\n    #timer {\n        position: absolute;\n        right: 10px;\n        top: 10px;\n        z-index: 1;\n    }\n"]
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService, user_service_1.UserService, parkingStation_service_1.ParkingService, email_service_1.EmailService, router_1.Router, menu_service_1.MenuService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map