import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from "./assets/style/MainTheme";
import MenuDrawer from "./components/drawer/MenuDrawer";
import {setUser} from "./store/actions";
import {connect} from "react-redux";
import router from "./router";


function App(props) {
    props.setUser()

    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <div className="App">
                    <MenuDrawer content={() => router()}/>
                </div>
            </ThemeProvider>
        </Router>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch(setUser()),
    };
};

export default connect(null, mapDispatchToProps)(App);
