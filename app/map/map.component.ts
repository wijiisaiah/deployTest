import { Component, OnInit } from '@angular/core';
declare let google: any;

@Component({
    moduleId: module.id,
    selector: 'map-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
    constructor() { }

    ngOnInit(){
        let mapProp = {
            center: new google.maps.LatLng(49.2827, -123.1207),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

}