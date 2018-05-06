import React from 'react';

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

export default ({points, enabledApproxFunc}) => (
    <main>
        <Grid>
            <ApproxSolution approxFunc={CustomApproxFunction1()} points={points}
                            enabled={enabledApproxFunc.func1}/>
            <ApproxSolution approxFunc={CustomApproxFunction2()} points={points}
                            enabled={enabledApproxFunc.func2}/>
            <ApproxSolution approxFunc={CustomApproxFunction3()} points={points}
                            enabled={enabledApproxFunc.func3}/>
            <ApproxSolution approxFunc={CustomApproxFunction4()} points={points}
                            enabled={enabledApproxFunc.func4}/>
            <ApproxSolution approxFunc={CustomApproxFunction5()} points={points}
                            enabled={enabledApproxFunc.func5}/>
            <ApproxSolution approxFunc={CustomApproxFunction6()} points={points}
                            enabled={enabledApproxFunc.func6}/>
        </Grid>
    </main>
);