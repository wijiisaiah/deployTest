import { Component, OnInit } from '@angular/core';
import {ParkingStation} from "../model/parkingStation";
import {UserAuthenticationService} from "../users/services/user-authentication.service";
declare let google: any;

@Component({
    moduleId: module.id,
    selector: 'map-map',
    template: '<div id="googleMap" class="col-sm-9 offset-sm-3"></div>',
    styles: [`
    #googleMap {
        width:75%;
        height:100%;
        margin: 0;
         }
`   ]
})
export class MapComponent implements OnInit {
    private map: any;
    private parkingStations: ParkingStation[];
    private markers: any;
    private infowindows: any;
    private infowindow: any;

    constructor(private uas: UserAuthenticationService) { }

    ngOnInit(){
        let testParking: ParkingStation = new ParkingStation('UBC Sub', '606 Something drive', 'MazDome', 49.2827, -123.1207, 100, true);
        let testParking2: ParkingStation = new ParkingStation('UBC asdf', '606 asdf drive', 'MazDome', 49.2727, -123.1207, 100, true);

        this.parkingStations = [testParking, testParking2];
        this.markers = [];
        this.infowindows = [];
        this.createMap();
        this.assignMarkersToParking();

    }

    private createMap(){
        let mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    private assignMarkersToParking(){
        for (let parking of this.parkingStations){
            this.markers.push(this.createMarker(parking))
        }
    }

    private setMarkersToMap(){
        for (let marker of this.markers){
            marker.setMap(this.map);
        }
    }

    private createMarker(parking: ParkingStation){
        // Creating marker
        let that = this;

        let marker = new google.maps.Marker({
            position: {lat: parking.lat, lng: parking.lng},
            map: this.map,
            title: parking.title
        });

        // Creating Info Window which is related to this Parking Station
        let infowindow = new google.maps.InfoWindow({
           content: `
        <div id="infoWindow">
             <h3>`+parking.title+`</h3><br>
             <p> Address: `+parking.address+`<br>
                 Type: `+parking.type+` <br>
                 Size: `+parking.size+`
             </p>
            <div class="col-sm-9 offset-sm-3"></div>
        </div>
        <button class="btn btn-info" onclick="">Reserve</button>`,
        });

        // Pushes the newly created Info Window to the array of info windows
        this.infowindows.push(infowindow);

        // Listener made to open InfoWindow when user clicks on a marker
        marker.addListener('click', function() {
            // Closes all Info Windows before opening new one
            for (let i=0;i<that.infowindows.length;i++) {
                that.infowindows[i].close();
            }
            infowindow.open(this.map, marker);
        });

        // Closes the info window if a click occurs on the map
        this.map.addListener('click', function(){
            infowindow.close(this.map, marker);
        });

        return marker;
    }



}