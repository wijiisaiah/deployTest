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
    private parkingStationsRef = this.databaseRef.ref('/parking stations');

    constructor(private fire: FirebaseConfigService) {
        this.getAddedParkingStations()
    }

    getAddedParkingStations(): Observable<any> {

        return Observable.create(obs => {
            
            this.parkingStationsRef.on('child_added', parking => {
                    const newParking = parking.val() as ParkingStation;
                    obs.next(newParking);
                },
                err => {
                    obs.throw(err);
                });
        });
    }

     getUpdatedParkingStation(): Observable<any> {
        return Observable.create(obs => {
            this.parkingStationsRef.on('child_changed', parkingStation => {
                const updatedParkingStation = parkingStation.val() as ParkingStation;
                obs.next(updatedParkingStation);
            },
            err => {
                obs.throw(err);
            });
        });
    }

    incrementAvailability(title: string) {

        let availability;
        const parkingStationsRef = this.parkingStationsRef.child(title);
        parkingStationsRef.once('value').then(snapshot => {
            availability = snapshot.val().availableSpots;
            availability++;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(err => console.error("Unable to increment", err));
        });


    }

    decrementAvailability(title: string) {


        let availability;
        const parkingStationsRef = this.parkingStationsRef.child(title);
        parkingStationsRef.once('value').then(snapshot => {
            availability = snapshot.val().availableSpots;
            availability--;
            parkingStationsRef.update({
                availableSpots: availability
            })
                .catch(err => console.error("Unable to decrement", err));
        });
    }

}