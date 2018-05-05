import {
    getFuncSum,
    calcDiscrepancy,
    replaceStrByDictionary
} from "./utils";

const math = require('mathjs');
const _ = require('lodash');

export class ApproxFunction {
    approxFunc = null;
    composition = null;

    constructor(approxFunc, composition) {
        this.approxFunc = approxFunc;
        this.composition = composition;
    }

    approx(points) {
        return {
            approxFunc: this.approxFunc,
            composition: this.composition,
            linearSystem: this.getLinearSystem(points),
            simplifiedSystem: this.getSimplifiedSystem(points),
            solution: this.getSolution(points)
        }
    }

    getLinearSystem() {
        const composition = this.composition;

        const linearSystem = composition.reduce((linearSystem, difFunc) => {
            const katexDifFunc = math.parse(difFunc.f).toTex().replace('x', 'x_i');
            const equation_left = composition.reduce((equation, func, index) => {
                const katexFunc = math.parse(func.f).toTex().replace('x', 'x_i');
                return equation + (index ? '+' : '') + `{${func.coef}}\\displaystyle\\sum_{i=1}^n{${katexDifFunc}}\\cdot{${katexFunc}}`;
            }, '');
            const equation_right = `\\displaystyle\\sum_{i=1}^n{y_i}\\cdot{${katexDifFunc}}`;
            return linearSystem + equation_left + '=' + equation_right + '\\\\';
        }, '');

        return '\\begin{cases}' + linearSystem + '\\end{cases}';
    }

    getSimplifiedSystem(points) {
        const composition = this.composition;

        const simplifiedLinearSystem = composition.reduce((linearSystem, difFunc) => {
            const equation_left = composition.reduce((equation, func, index) => {
                const coef = func.coef;
                const funcSum = getFuncSum(`${difFunc.f} * ${func.f}`, 'x', points);
                return equation + (index ? '+' : '') + `${funcSum}${coef}`
            }, '');
            const equation_right = getFuncSum(`${difFunc.f} * y`, 'y', points);

            return linearSystem + equation_left + '=' + equation_right + '\\\\';
        }, '');

        return '\\begin{cases}' + simplifiedLinearSystem + '\\end{cases}';
    }

    getSolutionCoef(points) {
        const composition = this.composition;

        const a = composition.map((difFunc) => {
            return composition.map((func) => {
                return getFuncSum(`${difFunc.f} * ${func.f}`, 'x', points);
            });
        });

        const b = composition.map((difFunc) => {
            return getFuncSum(`${difFunc.f} * y`, 'y', points);
        });

        const x = math.lusolve(a, b).map((el) => {
            return math.format(el[0], {
                notation: 'fixed',
                precision: 4
            })
        });

        return x.reduce((coef, el, index) => {
            const variable = this.composition[index].coef;
            return _.set(coef, variable, el);
        }, {})
    }

    getSolution(points) {
        const coef = this.getSolutionCoef(points);
        const approxFunc = replaceStrByDictionary(this.approxFunc, coef);
        const discrepancy = calcDiscrepancy(points, approxFunc);

        return {
            coef: coef,
            discrepancy: discrepancy,
            func: approxFunc
        }
    }
}

/**
 * y = a*x^2 + b*x + c
 */
export function CustomApproxFunction1() {
    const approxFunc = 'y = a*x^2 + b*x + c';
    const composition = [{
        f: 'x^2',
        coef: 'a'
    }, {
        f: 'x',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}

/**
 * y = a/x^2 + b/x + c
 */
export function CustomApproxFunction2() {
    const approxFunc = 'y = a/x^2 + b/x + c';
    const composition = [{
        f: '1/x^2',
        coef: 'a'
    }, {
        f: '1/x',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}

/**
 * y = a*x + b*e^-x + c
 */
export function CustomApproxFunction3() {
    const approxFunc = 'y = a*x + b*e^-x + c';
    const composition = [{
        f: 'x',
        coef: 'a'
    }, {
        f: 'e^-x',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}

/**
 * y = a/x + b*e^x + c
 */
export function CustomApproxFunction4() {
    const approxFunc = 'y = a/x + b*e^x + c';
    const composition = [{
        f: '1/x',
        coef: 'a'
    }, {
        f: 'e^x',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}

/**
 * y = a*x*ln(x) + b*e^x + c
 */
export function CustomApproxFunction5() {
    const approxFunc = 'y = a*x*log(x, e) + b*e^x + c';
    const composition = [{
        f: 'x*log(x, e)',
        coef: 'a'
    }, {
        f: 'e^x',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}

/**
 * y = a*sqrt(x) + b*sin(x) + c
 */
export function CustomApproxFunction6() {
    const approxFunc = 'y = a*sqrt(x) + b*sin(x) + c';
    const composition = [{
        f: 'sqrt(x)',
        coef: 'a'
    }, {
        f: 'sin(x)',
        coef: 'b'
    }, {
        f: '1',
        coef: 'c'
    }];

    return new ApproxFunction(approxFunc, composition);
}