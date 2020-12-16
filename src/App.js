import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Card from "./components/cards/cardFunction/cardFunction"
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from "./assets/style/MainTheme";
import Home from "./View/Home";
import CreateFunctionView from "./View/CreateFunctionView";
import DetailsFunctionView from "./View/DetailsFunctionView";
import Results from "./View/Results";
import MenuDrawer from "./components/drawer/MenuDrawer";
import {setUser} from "./store/actions";
import {connect} from "react-redux";
import ProfileView from "./View/ProfileView";


function App(props) {
    props.setUser()

    function router() {
        return <Switch>
            <Route path='/results/:id'>
                <Results/>
            </Route>
            <Route path="/about">
                <About/>
                <Card/>
            </Route>
            <Route path="/create">
                <CreateFunctionView/>
            </Route>
            <Route path="/profile">
                <ProfileView/>
            </Route>
            <Route path="/details/:id">
                <DetailsFunctionView/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>;
    }

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

function About() {
    return <h2>About</h2>;
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch(setUser()),
    };
};

export default connect(null, mapDispatchToProps)(App);
