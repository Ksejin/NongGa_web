import React from "react";
import Main from "./components/Main";
import Risk from "./components/Risk";
import Onion from "./components/Onion";
import Garlic from "./components/Garlic";
import Pepper from "./components/Pepper";

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
            <Route exact path="/onion">
                <Onion />
            </Route>
            <Route exact path="/garlic">
                <Garlic />
            </Route>
            <Route exact path="/pepper">
                <Pepper />
            </Route>
        </Router>
    );
}

export default App;
