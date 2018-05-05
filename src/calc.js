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
            const katexDifFunc = difFunc.katex;
            const equation_left = composition.reduce((equation, func, index) => {
                const katexFunc = func.katex;
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
        console.log(a, b, x, math.multiply(a, x));

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
export class CustomApproxFunction1 extends ApproxFunction {
}

/**
 * y = a/x^2 + b/x + c
 */
export class CustomApproxFunction2 extends ApproxFunction {
}

/**
 * y = a*x + b*e^(-x) + c
 */
export class CustomApproxFunction3 extends ApproxFunction {
}

/**
 * y = a/x + b*e^x + c
 */
export class CustomApproxFunction4 extends ApproxFunction {
}

/**
 * y = a*x*ln(x) + b*e^x + c
 */
export class CustomApproxFunction5 extends ApproxFunction {
}

/**
 * y = a*sqrt(x) + b*sin(x) + c
 */
export class CustomApproxFunction6 extends ApproxFunction {
}