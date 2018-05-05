import React, {Component} from 'react';

import 'katex/dist/katex.min.css';
import {BlockMath} from 'react-katex';

class ApproxSolution extends Component {
    render() {
        const {points, approxFunc} = this.props;
        if (points.length === 0) return null;
        const solution = approxFunc.approx(points);

        return (
            <React.Fragment>
                <div>{JSON.stringify(solution.approxFunc)}</div>
                <div>{JSON.stringify(solution.composition)}</div>
                <BlockMath math={solution.linearSystem}/>
                <BlockMath math={solution.simplifiedSystem}/>
                <div>{JSON.stringify(solution.solution)}</div>
            </React.Fragment>
        )
    }
}

export default ApproxSolution;