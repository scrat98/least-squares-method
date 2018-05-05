import React from 'react';

import {Grid, Row, Col} from "react-flexbox-grid";

import {
    CustomApproxFunction1,
    CustomApproxFunction2,
    CustomApproxFunction3,
    CustomApproxFunction4,
    CustomApproxFunction5,
    CustomApproxFunction6
} from "../calc";
import ApproxSolution from "./ApproxSolution";

export default ({points}) => (
    <main>
        <Grid>
            <ApproxSolution approxFunc={CustomApproxFunction1()} points={points}/>
            <ApproxSolution approxFunc={CustomApproxFunction2()} points={points}/>
            <ApproxSolution approxFunc={CustomApproxFunction3()} points={points}/>
            <ApproxSolution approxFunc={CustomApproxFunction4()} points={points}/>
            <ApproxSolution approxFunc={CustomApproxFunction5()} points={points}/>
            <ApproxSolution approxFunc={CustomApproxFunction6()} points={points}/>
        </Grid>
    </main>
);