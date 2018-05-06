import React, {Component} from 'react';

import 'katex/dist/katex.min.css';
import {BlockMath, InlineMath} from 'react-katex';
import Chart from '../Chart';

const math = require('mathjs');

class ApproxSolution extends Component {
    render() {
        const {points, approxFunc, enabled} = this.props;
        if (points.length === 0 || !enabled) return null;
        const solution = approxFunc.approx(points);

        return (
            <React.Fragment>
                <BlockMath>{math.parse(solution.approxFunc).toTex()}</BlockMath>
                <div>
                    {solution.composition.map((func, index) => {
                        return <InlineMath>{`\\phi_${index} = ${math.parse(func.f).toTex()}`}</InlineMath>
                    })}
                </div>
                <BlockMath math={solution.linearSystem}/>
                <BlockMath math={solution.simplifiedSystem}/>
                <div>
                    {Object.entries(solution.solution.coef).map((el) => {
                        const coef = el[0];
                        const value = el[1];
                        return <InlineMath>{`${coef} = ${value}`}</InlineMath>
                    })
                    }
                    <BlockMath>{`y = ${math.parse(solution.solution.func).toTex()}`}</BlockMath>
                    <BlockMath>{`\\sigma = ${solution.solution.discrepancy}`}</BlockMath>
                </div>
            </React.Fragment>
        )
    }
}

export default ApproxSolution;