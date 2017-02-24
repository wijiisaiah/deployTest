"use strict";
var Email = (function () {
    function Email(from, subject, to, body, type) {
        this.from = from;
        this.subject = subject;
        this.to = to;
        this.body = body;
        this.type = type;
    }
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=email.js.map