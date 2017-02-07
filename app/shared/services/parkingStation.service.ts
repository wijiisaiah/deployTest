import { ParkingStation } from './../model/parkingStation';
import { Booking } from './../model/booking';
import { Injectable } from "@angular/core";
import { FirebaseConfigService } from "../../core/service/firebase-config.service";
import { Observable } from "rxjs/Rx";
/**
 * Created by Isaiah on 2017-02-06.
 */
@Injectable()
export class ParkingService {

    private databaseRef = this.fire.database;

    constructor(private fire: FirebaseConfigService) {
        this.getAddedParkingStations()
    }

    getAddedParkingStations(): Observable<any> {

        const parkingStationsRef = this.databaseRef.ref('/parking stations');

        return Observable.create(obs => {
            parkingStationsRef.on('child_added', parking => {
                const newParking = parking.val() as ParkingStation;
                obs.next(newParking);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    incrementAvailability(booking: Booking) {

        const title = booking.parkingStation.title;
        const parkingStationsRef = this.databaseRef.ref('/parking stations').child(title);
        const availability = booking.parkingStation.availableSpots++;

        parkingStationsRef.update({
            availableSpots: availability
        },
        err => {
            console.error("Incrementing availability failed", err);
        });

    }

    decrementAvailability(booking: Booking) {

        const title = booking.parkingStation.title;
        const parkingStationsRef = this.databaseRef.ref('/parking stations').child(title);
        const availability = booking.parkingStation.availableSpots--;

        parkingStationsRef.update({
            availableSpots: availability
        },
        err => {
            console.error("Decrementing availability failed", err);
        });

    }
}