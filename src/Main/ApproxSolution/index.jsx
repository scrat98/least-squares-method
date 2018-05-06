import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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

    state = {
        enabled: false,
        charData: {},
        solution: {}
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {points, approxFunc, enabled, throwError} = nextProps;

        const tryApprox = (approxFunc, points) => {
            try {
                return approxFunc.approx(points);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        };

        if (points.length === 0 || !enabled) {
            return {
                enabled: false,
                charData: {},
                solution: {}
            };
        }

        const solution = tryApprox(approxFunc, points);
        if (!solution) {
            throwError();
            return prevState;
        }

        const chartData = getChartData(solution.solution.func, points);
        return {
            enabled: true,
            chartData,
            solution
        };
    }

    render() {
        const {chartData, solution, enabled} = this.state;
        if (!enabled) return null;

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