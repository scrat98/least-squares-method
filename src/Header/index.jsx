import React, {Component} from 'react';
import {Grid, Row, Col} from "react-flexbox-grid";

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import 'katex/dist/katex.min.css';
import {InlineMath} from 'react-katex';

const _ = require('lodash');

class Header extends Component {
    state = {
        xValue: '0.034 0.394 0.754 1.114 1.474 1.833 2.193 2.553 2.913',
        yValue: '2.156 2.988 3.377 3.708 3.802 3.900 4.067 4.129 4.171'
    };

    setXValues = (e) => {
        this.setState({xValue: e.target.value});
    };

    setYValues = (e) => {
        this.setState({yValue: e.target.value});
    };

    setPoints = () => {
        const {xValue, yValue} = this.state;
        const xValues = xValue.split(' ');
        const yValues = yValue.split(' ');

        const zip = _.zip(xValues, yValues);
        const points = zip.map((el) => {
            return {
                x: el[0],
                y: el[1]
            };
        });
        this.props.setPoints(points);
    };

    render() {
        return (
            <header>
                <AppBar title="Аппроксимация функции методом наименьших квадратов"
                        showMenuIconButton={false}
                        style={{textAlign: 'center'}}/>
                <Grid>
                    <Row middle="xs">
                        <Col xs={5}>
                            <TextField
                                value={this.state.xValue}
                                onChange={this.setXValues}
                                floatingLabelText="Значения x через пробел"
                                multiLine={true}
                                rows={1}
                                fullWidth={true}
                            />
                        </Col>

                        <Col xs={5}>
                            <TextField
                                value={this.state.yValue}
                                onChange={this.setYValues}
                                floatingLabelText="Значения y через пробел"
                                multiLine={true}
                                rows={1}
                                fullWidth={true}
                            />
                        </Col>
                        <Col xs={2}>
                            <RaisedButton
                                onClick={this.setPoints}
                                label="Рассчитать"
                                primary={true}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='{a}{x^2} + bx + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='\frac{a}{x^2} + \frac{b}{x} + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='a{x} + be^{-x} + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='\frac{a}{x} + be^{x} + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='a{x}\ln{x} + be^{x} + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <Toggle
                                label={<InlineMath math='a\sqrt{x} + b\sin{x} + c'/>}
                                labelPosition="right"
                                defaultToggled={true}
                            />
                        </Col>
                    </Row>
                </Grid>
            </header>
        )
    }
}

export default Header;