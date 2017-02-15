"use strict";
var Email = (function () {
    function Email(from, to, subject, body) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=email.js.map