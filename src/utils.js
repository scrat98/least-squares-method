const math = require('mathjs');
const _ = require('lodash');

export function getFuncSum(func, variable, data) {
    const result = data.reduce((accumulator, el) => {
        return accumulator + math.eval(func, el);
    }, 0);

    return math.format(result, {
        notation: 'fixed',
        precision: 4
    });
}

export function replaceStrByDictionary(str, dictionary) {
    const map = Array.prototype.map;
    return map.call(str, (char) => {
        if (_.has(dictionary, char)) return dictionary[char];
        return char;
    }).join('');
}

export function calcDiscrepancy(points, approxFunc) {
    const D = getFuncSum(`(${approxFunc} - y)^2`, 'y', points);
    const d = math.eval(`sqrt(${D})`);

    return math.format(d, {
        notation: 'fixed',
        precision: 4
    });
}