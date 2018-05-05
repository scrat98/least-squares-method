import React, {Component} from 'react';
import {
    CustomApproxFunction1,
    CustomApproxFunction2,
    CustomApproxFunction3,
    CustomApproxFunction4,
    CustomApproxFunction5,
    CustomApproxFunction6
} from "./calc";
import 'katex/dist/katex.min.css';
import {BlockMath} from 'react-katex';

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

const approxFunc1 = new CustomApproxFunction1();
const solution1 = approxFunc1.approx(points);

const approxFunc2 = new CustomApproxFunction2();
const solution2 = approxFunc2.approx(points);

const approxFunc3 = new CustomApproxFunction3();
const solution3 = approxFunc3.approx(points);

const approxFunc4 = new CustomApproxFunction4();
const solution4 = approxFunc4.approx(points);

const approxFunc5 = new CustomApproxFunction5();
const solution5 = approxFunc5.approx(points);

const approxFunc6 = new CustomApproxFunction6();
const solution6 = approxFunc6.approx(points);

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <hr/>
                <React.Fragment>
                    <div>{solution1.approxFunc}</div>
                    <div>{JSON.stringify(solution1.composition)}</div>
                    <BlockMath math={solution1.linearSystem}/>
                    <BlockMath math={solution1.simplifiedSystem}/>
                    <div>{JSON.stringify(solution1.solution)}</div>
                </React.Fragment>
                <hr/>

                <hr/>
                <React.Fragment>
                    <div>{solution2.approxFunc}</div>
                    <div>{JSON.stringify(solution2.composition)}</div>
                    <BlockMath math={solution2.linearSystem}/>
                    <BlockMath math={solution2.simplifiedSystem}/>
                    <div>{JSON.stringify(solution2.solution)}</div>
                </React.Fragment>
                <hr/>

                <hr/>
                <React.Fragment>
                    <div>{solution3.approxFunc}</div>
                    <div>{JSON.stringify(solution3.composition)}</div>
                    <BlockMath math={solution3.linearSystem}/>
                    <BlockMath math={solution3.simplifiedSystem}/>
                    <div>{JSON.stringify(solution3.solution)}</div>
                </React.Fragment>
                <hr/>

                <hr/>
                <React.Fragment>
                    <div>{solution4.approxFunc}</div>
                    <div>{JSON.stringify(solution4.composition)}</div>
                    <BlockMath math={solution4.linearSystem}/>
                    <BlockMath math={solution4.simplifiedSystem}/>
                    <div>{JSON.stringify(solution4.solution)}</div>
                </React.Fragment>
                <hr/>

                <hr/>
                <React.Fragment>
                    <div>{solution5.approxFunc}</div>
                    <div>{JSON.stringify(solution5.composition)}</div>
                    <BlockMath math={solution5.linearSystem}/>
                    <BlockMath math={solution5.simplifiedSystem}/>
                    <div>{JSON.stringify(solution5.solution)}</div>
                </React.Fragment>
                <hr/>

                <hr/>
                <React.Fragment>
                    <div>{solution6.approxFunc}</div>
                    <div>{JSON.stringify(solution6.composition)}</div>
                    <BlockMath math={solution6.linearSystem}/>
                    <BlockMath math={solution6.simplifiedSystem}/>
                    <div>{JSON.stringify(solution6.solution)}</div>
                </React.Fragment>
                <hr/>
            </React.Fragment>
        );
    }
}

export default App;
