import {Injectable} from "@angular/core";
import {ParkingStation} from "../model/parkingStation";
import {FirebaseConfigService} from "../../core/service/firebase-config.service";
import {Observable} from "rxjs/Rx";
/**
 * Created by Isaiah on 2017-02-06.
 */
@Injectable()
export class ParkingService{

    private parkingStations: ParkingStation[];
    private databaseRef = this.fire.database.ref('/parking stations');

    constructor(private fire: FirebaseConfigService){
        this.getAddedParkingStations()
    }

    getAddedParkingStations(): Observable<any> {

        return Observable.create(obs => {
            this.databaseRef.on('child_added', parking => {
                    const newParking = parking.val() as ParkingStation;
                    this.parkingStations.push(newParking);
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    updateParking(){

    }
}