"use strict";
function forbiddenStringValidator(strReg) {
    return function (control) {
        var str = control.value;
        var invalid = strReg.test(str);
        return invalid ? { 'forbiddenString': { str: str } } : null;
    };
}
exports.forbiddenStringValidator = forbiddenStringValidator;
//# sourceMappingURL=forbidden-string.validator.js.map