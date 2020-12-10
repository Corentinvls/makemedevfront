import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/cards/cardFunction/cardFunction"
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from "./assets/style/MainTheme";
import Home from "./View/Home";
import CreateFunctionView from "./View/CreateFunctionView";


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
                        <Route path="/create">
                            <CreateFunctionView/>
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
