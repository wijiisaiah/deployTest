import {ParkingStation} from "./parkingStation";
/**
 * Created by Isaiah on 2017-02-02.
 */
export class Booking{
    constructor(
        public parkingStation: ParkingStation,
        public date: string,
        public startTime: string,
        public startTimeMs: number,
        public code: number,
        public endTime?: string,
        public cost?: string
    ){}
}
