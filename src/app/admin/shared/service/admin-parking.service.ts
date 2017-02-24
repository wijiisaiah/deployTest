import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {FirebaseConfigService} from "../../../core/service/firebase-config.service";
import {ParkingStation} from "../../../shared/model/parkingStation";
/**
 * Created by Isaiah on 2017-02-06.
 */
@Injectable()
export class AdminParkingService {

    private databaseRef = this.fire.database;
    private parkingStationsRef = this.databaseRef.ref('/parking stations');

    constructor(private fire: FirebaseConfigService) {
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

    getUpdatedParkingStations(){
        return Observable.create(obs => {

            this.parkingStationsRef.on('child_changed', parking => {
                    const newParking = parking.val() as ParkingStation;
                    obs.next(newParking);
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    getRemovedParkingStations(){
        return Observable.create(obs => {

            this.parkingStationsRef.on('child_removed', parking => {
                    const newParking = parking.val() as ParkingStation;
                    obs.next(newParking);
                },
                err => {
                    obs.throw(err);
                });
        });

    }

    updateParkingStation(parking: ParkingStation){
        let updateParkingRef = this.parkingStationsRef.child(parking.id);
        updateParkingRef.update({
            title: parking.title,
            address: parking.address,
            type: parking.type,
            lat: parking.lat,
            lng: parking.lng,
            size: parking.size,
            availableSpots: parking.availableSpots,
            availability: parking.availability,
            rate: parking.rate,
        })
    }

    addParkingStation(parking: ParkingStation){
        let newParking = this.parkingStationsRef.push();
        newParking.set({
            title: parking.title,
            address: parking.address,
            type: parking.type,
            lat: parking.lat,
            lng: parking.lng,
            size: parking.size,
            availableSpots: parking.availableSpots,
            availability: parking.availability,
            rate: parking.rate,
            id: newParking.key
        })
    }

    deleteParkingStation(parking: ParkingStation){
        let deleteThisRef = this.parkingStationsRef.child(parking.id);
        deleteThisRef.remove();
    }

}