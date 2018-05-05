import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class App extends Component {
    state = {
        points: []
    };

    setPoints = (points) => {
        this.setState({points})
    };

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider>
                    <Header setPoints={this.setPoints}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Main points={this.state.points}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Footer/>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
