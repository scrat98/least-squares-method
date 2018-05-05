import React, {Component} from 'react';
import {ApproxFunction} from "./calc";
import 'katex/dist/katex.min.css';
import {BlockMath} from 'react-katex';

class App extends Component {
    render() {
        const approxFunc = new ApproxFunction('y = a*x + b*e^(-x) + c', [{
            f: 'x',
            coef: 'a',
            katex: '{x_i}'
        }, {
            f: 'e^(-x)',
            coef: 'b',
            katex: 'e^{-x_i}'
        }, {
            f: '1',
            coef: 'c',
            katex: '1'
        }]);

        const points = [{
            x: 0.034,
            y: 2.156
        }, {
            x: 0.394,
            y: 2.988
        }, {
            x: 0.754,
            y: 3.377
        }, {
            x: 1.114,
            y: 3.708
        }, {
            x: 1.474,
            y: 3.802
        }, {
            x: 1.833,
            y: 3.900
        }, {
            x: 2.193,
            y: 4.067
        }, {
            x: 2.553,
            y: 4.129
        }, {
            x: 2.913,
            y: 4.171
        }];

        const solution = approxFunc.approx(points);
        return (
            <React.Fragment>
                <div>{solution.approxFunc}</div>
                <div>{JSON.stringify(solution.composition)}</div>
                <BlockMath math={solution.linearSystem}/>
                <BlockMath math={solution.simplifiedSystem}/>
                <div>{JSON.stringify(solution.solution)}</div>
            </React.Fragment>
        );
    }
}

export default App;
