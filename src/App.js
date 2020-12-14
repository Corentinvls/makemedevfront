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
import CreateFunctionView from "./View/CreateFunctionView";
import DetailsFunctionView from "./View/DetailsFunctionView";
import Results from "./View/Results";


function App() {
    const defaultprops = {
            "_id": "1",
            "bookMarked": 0,
            "shared": 0,
            "name": "COCO",
            "author": {
                "pseudo": "coco",
                "avatar": "12",
                "creationDate": "10/12/2020"
            },
            "params": [
                {
                    "name": "test",
                    "type": "function",
                    "description": "zheaheuiaiehaiehaeazkeja",
                    "defaultValue": "default"
                }
            ],
            "returnvalue":[
                {
                    "name": "test",
                    "type": "function",
                    "description": "zheaheuiaiehaiehaeazkeja",
                    "defaultValue": "default"
                }
            ]
                ,
            "tag": ["js","php"],
            "post": [
                {
                    "id": "1",
                    "description": "ebkhazeajnedqsdmlqksdm",
                    "author": {
                        "pseudo": "coco",
                        "avatar": "12",
                        "creationDate": "10/12/2020"
                    },
                    "function": "help",
                    "like": 100,
                    "dislike": 0,
                    "commentary": [
                        {
                            "pseudo": "jojo",
                            "commentary": "lkajeazelakjekl",
                            "date": "10/12/2020"
                        }
                    ]
                }
            ]
    };
    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route path='/results'>
                            <Results/>
                        </Route>
                        <Route path="/about">
                            <About/>
                            <Card/>
                        </Route>
                        <Route path="/create">
                            <CreateFunctionView/>
                        </Route>
                        <Route path="/details">
                            <DetailsFunctionView {...defaultprops}/>
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
