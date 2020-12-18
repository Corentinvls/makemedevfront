import {Route, Switch} from "react-router-dom";
import Results from "./View/Results";
import CreateFunctionView from "./View/CreateFunctionView";
import ProfileView from "./View/ProfileView";
import DetailsFunctionView from "./View/DetailsFunctionView";
import ResponseFunctionView from "./View/ResponseFunctionView";
import Home from "./View/Home";
import React from "react";

export default function router() {
    return <Switch>
        <Route path='/results/:id'>
            <Results/>
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
        <Route path="/improve/:mainId/:postId">
            <ResponseFunctionView/>
        </Route>
        <Route path="/">
            <Home/>
        </Route>
    </Switch>;
}
