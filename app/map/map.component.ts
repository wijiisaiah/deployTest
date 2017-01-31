import { Component, OnInit } from '@angular/core';
import {ParkingStation} from "../model/parkingStation";
declare let google: any;

@Component({
    moduleId: module.id,
    selector: 'map-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
    private map: any;
    private parkingStations: ParkingStation[];
    private testParking: ParkingStation = new ParkingStation('testParking', 'UBC drive', 49.2827, -123.1207, 100, true);
    private markers: any;

    constructor() { }

    ngOnInit(){
        this.parkingStations = [this.testParking];
        this.markers = [];
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
        let marker = new google.maps.Marker({
            position: {lat: parking.lat, lng: parking.lng},
            map: this.map,
            title: parking.title
        });

        let infowindow = new google.maps.InfoWindow({
            content: this.makeHTMLforInfoWindow(parking)
        });

        marker.addListener('click', function() {
            infowindow.open(this.map, marker);
        });

        return marker;
    }

    private makeHTMLforInfoWindow(parking: ParkingStation): string{
        let title = parking.title;
        let HTML = `
            <div id="infoWindow">
                <h1></h1>
            </div>
`;
        return HTML;
    }

}