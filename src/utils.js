import {helpers} from 'chart.js';

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

export function getChartData(func, points) {
    const color = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    const approxData = points.map((point) => {
        const y = math.eval(func, {x: point.x});
        return {
            x: point.x,
            y: math.format(y, {
                notation: 'fixed',
                precision: 4
            })
        }
    });

    return {
        datasets: [{
            borderColor: color.blue,
            backgroundColor: helpers.color(color.blue).alpha(0.2).rgbString(),
            showLine: false,
            data: points
        }, {
            borderColor: color.red,
            backgroundColor: helpers.color(color.red).alpha(0.2).rgbString(),
            showLine: true,
            data: approxData,
            fill: false
        }]
    };
}