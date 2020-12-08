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
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from "./style/MainTheme";


function App() {
    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <div className="App">
                    <Navbar/>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
