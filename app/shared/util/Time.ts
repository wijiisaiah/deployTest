/**
 * Created by Isaiah on 2017-02-03.
 */
export class Time{
    constructor(){

    }

    public static getCurrentDate(): string{
        let d = new Date();
        let day = d.getDate().toString();
        let month = d.getMonth().toString();
        let year = d.getFullYear().toString();

        if (day.length < 2){ day = "0" + day}
        if (month.length < 2){ month = "0" + month}

        return month + " " + day + ", " + year;
    }

    public static getCurrentTime(): string{
        let d = new Date();
        let second = d.getSeconds().toString();
        let minutes = d.getMinutes().toString();
        let hour = d.getHours().toString();

        if (second.length < 2){ second = "0" + second}
        if (minutes.length < 2){ minutes = "0" + minutes}
        if (hour.length < 2){ hour = "0" + hour}

        return hour + ":" + minutes + ":" + second;

    }
}