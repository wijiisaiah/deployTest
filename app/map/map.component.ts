import { Email } from './../shared/model/email';
import {Observable, Subscription} from 'rxjs/Rx';
import { ParkingService } from './../shared/services/parkingStation.service';
import { Component, OnInit, NgZone, HostListener, OnDestroy } from '@angular/core';
import { ParkingStation } from "../shared/model/parkingStation";
import { UserService } from "../shared/services/user.service";
import { EmailService } from "../shared/services/email.service";
import { BookingService } from "../shared/services/booking.service";
import { Booking } from "../shared/model/booking";
import { Router } from "@angular/router";
import { MenuService } from "../shared/services/menu.service";
import lpad = require("core-js/library/fn/string/lpad");
declare let google: any;
declare let $: any;

@Component({
    moduleId: module.id,
    selector: 'map-map',
    template: `
    <div id="timer"></div>
    <user-menu></user-menu> 
    <div id="googleMap"></div>
    `,

    styles: [`
    #googleMap {
        width: 100%;
        height:100%;
        padding: 0;
         }
    #timer {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1;
    }
`]
})
export class MapComponent implements OnInit, OnDestroy {


    @HostListener('window:parkBike', ['$event'])
    parkBikeListener(event) {
        this.reserveEndTime = null;
        this.bookingService.updateCurrentBooking(this.currentBooking);
        this.closeInfoWindows();
        clearInterval(this.timeOut);
        document.getElementById('timer').innerText = '';

    }

    @HostListener('window:reserve', ['$event'])
    reserveEventListener(event) {
        if (!this.currentBooking) {
            this.closeInfoWindows();
            this.bookingService.createBooking(this.selectedParkingStation); //create a booking (user -> current booking)

            let email = new Email(null, null, null, null);
            // this.emailService.createEmail('booking confirmation').
            //     subscribe(newEmail => {
            //         email = newEmail;

            //     });

            this.emailService.createEmail('booking confirmation')
                .then((createdEmail) => {
                    console.log('created email', createdEmail);
                    // this.emailService.sendEmail(createdEmail);
                });
            // console.log('Email created', email);


            // console.log('Email sent', email);


        } else {
            alert('Cannot have more than 1 reservation at a time');
        }

    }

    @HostListener('window:cancel', ['$event'])
    cancelEventListener(event) {
        this.bookingService.removeCurrentBooking(this.currentBooking.parkingStation.title);
        this.currentBooking = undefined;
        this.closeInfoWindows();
    }


    @HostListener('window:complete', ['$event'])
    completeEventListener(event) {
        this.closeInfoWindows();
        this.bookingService.completeBooking(this.currentBooking);

    }

    private map: any;
    private reserveEndTime = null;
    private currentBooking: Booking;
    private parkingStations: ParkingStation[] = [];
    private markers: any;
    private infowindows: any;
    private selectedParkingStation: ParkingStation;
    private userLocationMarker;
    private timeOut;
    private userLocation;
    private subscriptions: Subscription[] = [];


    constructor(private bookingService: BookingService,
        private userService: UserService,
        private parkingService: ParkingService,
        private emailService: EmailService,
        private router: Router,
        private menuService: MenuService) {
    }

    ngOnDestroy() {
        for(let subs of this.subscriptions){
            subs.unsubscribe();
        }
        clearInterval(this.timeOut);
    }


    ngOnInit() {

        this.markers = [];
        this.infowindows = [];
        this.getCurrentLocation();
        this.getCurrentBooking();
        this.createMap();
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
        this.setUserLocation();
        this.getReservationTimer();
        let that = this;
        let mapDiv = document.getElementById('googleMap');

        this.map.addListener('click', function () {
            that.menuService.closeNav();
        });
    }

    getCurrentLocation() {

       let temp =  this.userService.getCurrentLocation()
            .subscribe(pos => {
                this.userLocation = pos;
            });

       this.subscriptions.push(temp);
    }
    getReservationTimer() {
        let that = this;
       let temp =  this.bookingService.getReservationTimer()
            .subscribe(endTime => {
                if (endTime !== undefined) {
                    that.reserveEndTime = endTime;
                    that.timeOut = setInterval(() => {
                        let that = this;
                        let remaining = Math.max(0, that.reserveEndTime - new Date().getTime());
                        let minutes = Math.floor((remaining / 1000) / 60);
                        let seconds = (Math.round((remaining / 1000)) % 60).toString();
                        if (seconds.length < 2) {
                            seconds = "0" + seconds;
                        }
                        document.getElementById('timer').innerText = minutes + ':' + seconds;
                        if (that.reserveEndTime <= new Date().getTime() && that.reserveEndTime !== null) {
                            this.reserveEndTime = null;
                            this.bookingService.removeCurrentBooking(this.currentBooking.parkingStation.title);
                            this.currentBooking = undefined;
                            this.closeInfoWindows();
                        }
                    }, 1000);
                } else {
                    that.reserveEndTime = null;
                }
            });
        this.subscriptions.push(temp);
    }

    getCurrentBooking() {
        let temp = this.bookingService.getCurrentBooking()
            .subscribe(booking => {
                this.currentBooking = booking;
                if (booking) {
                    this.updateMarker(booking.parkingStation);
                }
            },
            err => {
                console.error("Unable to get current booking -", err);
            });
        this.subscriptions.push(temp);
    }

    getAddedParkingStations() {

        let temp = this.parkingService.getAddedParkingStations()
            .subscribe(parkingStation => {
                this.parkingStations.push(parkingStation);
                this.markers.push(this.createMarker(parkingStation))
    },
            err => {
                console.error("Unable to get added parking station - ", err);
            });
        this.subscriptions.push(temp);

    }

    getUpdatedParkingStations() {
        let temp = this.parkingService.getUpdatedParkingStation()
            .subscribe(updatedParkingStation => {
                const parkingIndex = this.parkingStations.map(index => index.title).indexOf(updatedParkingStation['title']);
                this.parkingStations[parkingIndex] = updatedParkingStation;
                this.updateMarker(updatedParkingStation);
            },
            err => {
                console.error("Unable to get updated parking station - ", err);
            });
        this.subscriptions.push(temp);
    }


    private createMap() {
        let mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    }


    private updateMarker(parking: ParkingStation) {

        let that = this;
        let valid = parking.availableSpots > 0;
        let content = this.getHTMLcontent(parking, valid);
        this.closeInfoWindows();

        let icon;
        if (valid) {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        } else {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }

        if (this.currentBooking !== undefined) {
            if (this.currentBooking.parkingStation.title === parking.title) {
                icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                if (this.reserveEndTime !== null) {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                }
            }
        }

        for (let marker of this.markers) {
            if (marker.title === parking.title) {

                for (let infoWindow of this.infowindows) {
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
    }

    private createMarker(parking: ParkingStation) {
        // Creating marker
        let that = this;
        let icon;
        let valid = parking.availableSpots > 0;

        if (valid) {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        } else {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }

        if (this.currentBooking !== undefined) {
            if (this.currentBooking.parkingStation.title === parking.title) {
                icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                if (this.reserveEndTime !== null) {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                }
            }
        }


        let marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: this.map,
            title: parking.title,
            icon: icon
        });

        let content = this.getHTMLcontent(parking, valid);

        // Creating Info Window which is related to this Parking Station
        let infowindow = new google.maps.InfoWindow({
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
    }

    private closeInfoWindows() {
        for (let i = 0; i < this.infowindows.length; i++) {
            this.infowindows[i].close();
        }
    }

    private setUserLocation() {
        let that = this;

        let controlDiv = document.createElement('div');

        let firstChild = document.createElement('button');
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

        let secondChild = document.createElement('div');
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
            let imgX = '0';
            let animationInterval = setInterval(function () {
                if (imgX == '-18') imgX = '0';
                else imgX = '-18';
                $('#you_location_img').css('background-position', imgX + 'px 0px');
            }, 500);
            if (that.userLocation) {

                let latlng = { lat: that.userLocation.coords.latitude, lng: that.userLocation.coords.longitude };
                that.userLocationMarker = new google.maps.Marker({
                    position: latlng,
                    icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
                });

                that.userLocationMarker.setMap(that.map);
                that.map.setCenter(latlng);
                that.map.setZoom(14);
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '-144px 0px');
            } else {
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '0px 0px');
            }
        });

        controlDiv.tabIndex = 1;
        that.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }


    private handleLocationError() {
        console.log('no access to geolocation');
    }


    private getHTMLcontent(parking: ParkingStation, valid: Boolean) {
        let buttons;
        if (valid) {
            buttons = `<button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("reserve", {detail: "Reservation Started"}));'>Reserve</button>`;
        } else {
            buttons = `Module is Full`;
        }

        if (this.currentBooking !== undefined) {
            if (this.currentBooking.parkingStation.title === parking.title) {
                buttons = `<button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("complete", {detail: "End Booking"}));'>Complete</button>
                        <button class="btn btn-warning" onclick='window.dispatchEvent(new CustomEvent("cancel", {detail: "Cancel Booking"}));'>Cancel</button>`;
                if (this.reserveEndTime !== null) {
                    buttons = `<button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("parkBike", {detail: "Park Bike"}));'>Park Bike</button>
                        <button class="btn btn-warning" onclick='window.dispatchEvent(new CustomEvent("cancel", {detail: "Cancel Booking"}));'>Cancel</button>`
                }
            }
        }


        return `
                <body>
                    <div id="infoWindow">
                     <h3>` + parking.title + `</h3><br>
                     <p> Address: ` + parking.address + `<br>
                         Type: ` + parking.type + ` <br>
                         Size: ` + parking.size + `<br>
                         Availabiliy: ` + parking.availableSpots + "/" + parking.size + `<br>
                         Rate: ` + parking.rate + ` 
                     </p>
                     <br>
                    ` + buttons + `
                </div>
                </body>
                  `;
    }


}