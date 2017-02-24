import { Component, OnInit } from '@angular/core';

import { AdminParkingService } from '../../shared/service/admin-parking.service';

import { ParkingStation } from '../../../shared/model/parkingStation';

@Component({
    moduleId: module.id,
    selector: 'parking-list',
    templateUrl: 'parking-list.component.html',
    styleUrls: ['parking-list.component.css']
})
export class AdminParkingListComponent implements OnInit {

    private parkingStations: ParkingStation[] = [];

    constructor(private aps: AdminParkingService ) { }

    ngOnInit() {
        this.getAddedParkingStations();
        this.getUpdatedParkingStations();
    }

    getAddedParkingStations() {
        this.aps.getAddedParkingStations()
        .subscribe(parking => {
            this.parkingStations.push(parking);
            console.log(this.parkingStations);
        },
        err => {
            console.error("Unable to get added parking station - ", err);
        });
    }

    getUpdatedParkingStations() {
        this.aps.getUpdatedParkingStations()
        .subscribe(updatedStation => {
            const parkingIndex = this.parkingStations.map(index => index.id).indexOf(updatedStation['id']);
            this.parkingStations[parkingIndex] = updatedStation;
        },
        err => {
            console.log("Unable to get updated parking station - ", err);
        });
    }

}
