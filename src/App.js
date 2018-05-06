import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class App extends Component {
    state = {
        points: [],
        enabledApproxFunc: {}
    };

    setPoints = (points) => {
        this.setState({points})
    };

    setApproxFunc = (enabledApproxFunc) => {
        this.setState({enabledApproxFunc})
    };

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider>
                    <Header setPoints={this.setPoints}
                            setApproxFunc={this.setApproxFunc}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Main
                        points={this.state.points}
                        enabledApproxFunc={this.state.enabledApproxFunc}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Footer/>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
