import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {Scatter} from 'react-chartjs-2';

import 'katex/dist/katex.min.css';
import {BlockMath, InlineMath} from 'react-katex';
import styled from 'styled-components';

import {getChartData} from "../../utils";

const math = require('mathjs');

const FunctionsContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const CoefContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

class ApproxSolution extends Component {
    render() {
        const {points, approxFunc, enabled} = this.props;
        if (points.length === 0 || !enabled) return null;

        const solution = approxFunc.approx(points);
        const chartData = getChartData(solution.solution.func, points);

        return (
            <Paper style={{padding: '0.5rem', margin: '1rem 0'}}>
                <BlockMath>{math.parse(solution.approxFunc).toTex()}</BlockMath>
                <FunctionsContainer>
                    {solution.composition.map((func, index) => {
                        return <InlineMath>{`\\phi_${index} = ${math.parse(func.f).toTex()}`}</InlineMath>
                    })}
                </FunctionsContainer>
                <BlockMath math={solution.linearSystem}/>
                <BlockMath math={solution.simplifiedSystem}/>
                <CoefContainer>
                    {Object.entries(solution.solution.coef).map((el) => {
                        const coef = el[0];
                        const value = el[1];
                        return <InlineMath>{`${coef} = ${value}`}</InlineMath>
                    })
                    }
                </CoefContainer>
                <BlockMath>{`y = ${math.parse(solution.solution.func).toTex()}`}</BlockMath>
                <BlockMath>{`\\sigma = ${solution.solution.discrepancy}`}</BlockMath>
                <Scatter
                    data={chartData}
                    options={{
                        legend: {
                            display: false
                        }
                    }}/>
            </Paper>
        )
    }
}

export default ApproxSolution;