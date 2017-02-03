/**
 * Created by Isaiah on 2017-02-03.
 */
export class Time{
    constructor(){

    }

    public getCurrentDate(): string{
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        return month + " " + day + ", " + year;
    }

    public getCurrentTime(): string{
        let d = new Date();
        let second = d.getSeconds().toString();
        let minutes = d.getMinutes().toString();
        let hour = d.getHours().toString();

        if (second.length < 2){ second = "0" + second}
        if (minutes.length < 2){ second = "0" + second}
        if (hour.length < 2){ second = "0" + second}

        return hour + ":" + minutes + ":" + second;

    }
}