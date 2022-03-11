import React from "react";
import "./App.scss";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Homepage } from "./components/Homepage";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Planner</h1>
        <Switch>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
