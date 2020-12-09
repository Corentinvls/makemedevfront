import React from "react";
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/cards/cardFunction/cardFunction"
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from "./assets/style/MainTheme";
import Home from "./View/Home";


function App() {
    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route path="/about">
                            <About/>
                            <Card/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

export default App;
