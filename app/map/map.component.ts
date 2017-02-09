import {Observable} from 'rxjs/Rx';
import {ParkingService} from './../shared/services/parkingStation.service';
import {Component, OnInit, NgZone, HostListener, OnDestroy} from '@angular/core';
import {ParkingStation} from "../shared/model/parkingStation";
import {UserService} from "../shared/services/user.service";
import {BookingService} from "../shared/services/booking.service";
import {Booking} from "../shared/model/booking";
import {Router} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {MenuService} from "../shared/services/menu.service";
declare let google: any;

@Component({
    moduleId: module.id,
    selector: 'map-map',
    template: '<user-menu></user-menu><div id="googleMap"></div>',

    styles: [`
    #googleMap {
        width: 100%;
        height:100%;
        padding: 0;
         }
`]
})
export class MapComponent implements OnInit {
    @HostListener('window:reserve', ['$event'])
    reserveEventListener(event) {
        console.log(event.detail);
        this.closeInfoWindows();
        this.bookingService.createBooking(this.selectedParkingStation); //create a booking (user -> current booking)
        console.log("Current booking created");
    }

    @HostListener('window:complete', ['$event'])
    completeEventListener(event) {
        console.log(event.detail);
        this.closeInfoWindows();
        let currentBooking = new Booking(null, null, null, null);
        //get the current booking from Firebase and set it to currentBooking
        this.bookingService.getCurrentBooking()
            .subscribe(booking => {
                    currentBooking = booking;
                },
                err => {
                    console.error("Unable to get current booking", err);
                });
        // console.log("Current booking retrieved", currentBooking);

        //update currentBooking with end time and cost
        this.bookingService.completeBooking(currentBooking);

    }

    private map: any;
    private parkingStations: ParkingStation[] = [];
    private markers: any;
    private infowindows: any;
    private selectedParkingStation: ParkingStation;

    constructor(private bookingService: BookingService,
                private userService: UserService,
                private parkingService: ParkingService,
                private router: Router,
                private menuService: MenuService) {

    }

    ngOnInit() {

        this.markers = [];
        this.infowindows = [];
        this.createMap();
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
        let that = this;
        this.map.addListener('click', function () {
            that.menuService.closeNav();
        });


    }

    getAddedParkingStations() {

        this.parkingService.getAddedParkingStations()
            .subscribe(parkingStation => {
                    this.parkingStations.push(parkingStation);
                    this.markers.push(this.createMarker(parkingStation))
                },
                err => {
                    console.error("Unable to get added parking station - ", err);
                });

    }

    getUpdatedParkingStations() {
        this.parkingService.getUpdatedParkingStation()
            .subscribe(updatedParkingStation => {
                    const parkingIndex = this.parkingStations.map(index => index.title).indexOf(updatedParkingStation['title']);
                    this.parkingStations[parkingIndex] = updatedParkingStation;
                    console.log("Update works: ", this.parkingStations);
                    this.updateMarker(updatedParkingStation);
                },
                err => {
                    console.log("Unable to get updated parking station - ", err);
                });
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

        for (let marker of this.markers) {
            for (let infoWindow of this.infowindows) {
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
    }

    private createMarker(parking: ParkingStation) {
        console.log('creating marker', parking);
        // Creating marker
        let that = this;
        let icon;
        let valid = parking.availableSpots > 0;

        if (valid) {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        } else {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }

        let marker = new google.maps.Marker({
            position: {lat: parking.lat, lng: parking.lng},
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

    getHTMLcontent(parking: ParkingStation, valid: Boolean) {
        let html;
        if (valid) {
            html = `
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
                    <button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("reserve", {detail: "Reservation Started"}));'>Reserve</button>
                    <button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("complete", {detail: "End Booking"}));'>Complete</button>
                </div>
                </body>
                  `;
        }
        else {
            html = `
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
                    <button class="btn btn-info" onclick='window.dispatchEvent(new CustomEvent("complete", {detail: "End Booking"}));'>Complete</button>
                </div>
                </body>
                  `;
        }
        return html
    }


}