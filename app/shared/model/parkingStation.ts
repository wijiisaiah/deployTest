/**
 * Created by Isaiah on 2017-01-31.
 */
export class ParkingStation{
    constructor(
        public title: string,
        public address: string,
        public type: string,
        public lat: number,
        public lng: number,
        public size: number,
        public availableSpots: number,
        public availability: boolean,
        public rate: number
    ){}
}