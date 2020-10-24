"use strict";
function windowParse(string) {
    var part1 = string.split('\n');
    var part2 = part1[1].split('window["ytInitialData"] = ')[1].split(';')[0];
    if (part2 == undefined)
        windowParse(string);
    return JSON.parse(part2) || undefined;
}
module.exports.windowParse = windowParse;
