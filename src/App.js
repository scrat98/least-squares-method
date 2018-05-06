import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Header from "./Header";
import Main from "./Main";

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
        },
        error: false
    };

    setPoints = (points) => {
        this.setState({points})
    };

    setApproxFunc = (enabledApproxFunc) => {
        this.setState({enabledApproxFunc})
    };

    errorClose = () => {
        console.log('close');
        this.setState((prevState) => {
            if (prevState.error)
                return {error: false}
        });
    };

    errorOpen = () => {
        this.setState((prevState) => {
            if (!prevState.error)
                return {error: true}
        });
    };

    render() {
        const dialogActions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.errorClose}
            />
        ];

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
                        enabledApproxFunc={this.state.enabledApproxFunc}
                        throwError={this.errorOpen}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Dialog
                        title="Error"
                        modal={true}
                        actions={dialogActions}
                        open={this.state.error}>Неккоректно заданы точки</Dialog>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
