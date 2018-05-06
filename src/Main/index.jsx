import React, {PureComponent} from 'react';

import {Grid} from "react-flexbox-grid";

import {
    CustomApproxFunction1,
    CustomApproxFunction2,
    CustomApproxFunction3,
    CustomApproxFunction4,
    CustomApproxFunction5,
    CustomApproxFunction6
} from "../calc";
import ApproxSolution from "./ApproxSolution";

class Main extends PureComponent {
    render() {
        const {points, enabledApproxFunc, throwError} = this.props;

        return (
            <main>
                <Grid>
                    <ApproxSolution approxFunc={CustomApproxFunction1()}
                                    points={points}
                                    enabled={enabledApproxFunc.func1}
                                    throwError={throwError}/>
                    <ApproxSolution approxFunc={CustomApproxFunction2()}
                                    points={points}
                                    enabled={enabledApproxFunc.func2}
                                    throwError={throwError}/>
                    <ApproxSolution approxFunc={CustomApproxFunction3()}
                                    points={points}
                                    enabled={enabledApproxFunc.func3}
                                    throwError={throwError}/>
                    <ApproxSolution approxFunc={CustomApproxFunction4()}
                                    points={points}
                                    enabled={enabledApproxFunc.func4}
                                    throwError={throwError}/>
                    <ApproxSolution approxFunc={CustomApproxFunction5()}
                                    points={points}
                                    enabled={enabledApproxFunc.func5}
                                    throwError={throwError}/>
                    <ApproxSolution approxFunc={CustomApproxFunction6()}
                                    points={points}
                                    enabled={enabledApproxFunc.func6}
                                    throwError={throwError}/>
                </Grid>
            </main>
        )
    }
}

export default Main;