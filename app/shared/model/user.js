"use strict";
var User = (function () {
    function User(name, uid, email, address, phoneNumber, currentBooking, pastBookings) {
        this.name = name;
        this.uid = uid;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.currentBooking = currentBooking;
        this.pastBookings = pastBookings;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map