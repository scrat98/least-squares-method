import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class App extends Component {
    state = {
        points: [],
        enabledApproxFunc: {
            func1: true,
            func2: true,
            func3: true,
            func4: true,
            func5: true,
            func6: true
        }
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
                            setApproxFunc={this.setApproxFunc}
                            enabledApproxFunc={this.state.enabledApproxFunc}/>
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
