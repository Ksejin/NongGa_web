import React from "react";
import Main from "./components/Main";
import Risk from "./components/Risk";
import Predict from "./components/Predict";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Route exact path="/">
                <Main />
            </Route>
            <Route exact path="/risk">
                <Risk />
            </Route>
            <Route exact path="/predict">
                <Predict />
            </Route>
        </Router>
    );
}

export default App;
