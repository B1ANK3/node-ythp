"use strict";
function windowParse(string) {
    var part1 = string.split('\n');
    var part2 = part1[1].split('window["ytInitialData"] = ')[1].split(';')[0];
    part2 = part2.trim();
    if (part2 == undefined)
        windowParse(string);
    return asyncJSONParse(part2);
}
function asyncJSONParse(json, retry = 3) {
    const parse = (raw, tries) => {
        var error = {
            tries: 0,
            success: true,
            error: undefined
        };
        for (let i = 0; i < tries; i++) {
            try {
                var j = JSON.parse(raw);
                return j;
            }
            catch (err) {
                error['error'] = err;
            }
        }
        error['tries'] = tries;
        error['success'] = false;
        return error;
    };
    var returnVal = parse(json, retry);
    if (returnVal.success == false)
        throw new Error(returnVal.err.message + ` Retried ${returnVal.tries} times.`);
    return returnVal;
}
module.exports.windowParse = windowParse;
