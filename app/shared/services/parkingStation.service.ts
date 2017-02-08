import {ParkingStation} from './../model/parkingStation';
import {Booking} from './../model/booking';
import {Injectable} from "@angular/core";
import {FirebaseConfigService} from "../../core/service/firebase-config.service";
import {Observable} from "rxjs/Rx";
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
                    console.log(newParking);
                    obs.next(newParking);
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    incrementAvailability(booking: Booking) {

        const title = booking.parkingStation.title;
        let availability;
        const parkingStationsRef = this.databaseRef.ref('/parking stations').child(title);
        parkingStationsRef.once('value').then(snapshot => {
            availability = snapshot.val().availableSpots;
            console.log(availability);
            availability++;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(err => console.error("Unable to increment", err));
        });
        // let temp: number = booking.parkingStation.availableSpots--;


    }

    decrementAvailability(booking: Booking) {


        const title = booking.parkingStation.title;
        let availability;
        const parkingStationsRef = this.databaseRef.ref('/parking stations').child(title);
        parkingStationsRef.once('value').then(snapshot => {
            availability = snapshot.val().availableSpots;
            console.log(availability);
            availability--;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(err => console.error("Unable to decrement", err));
        });
        // let temp: number = booking.parkingStation.availableSpots--;
    }
}