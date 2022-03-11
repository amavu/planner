import React from "react";
import "./App.scss";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";

const App = () => {
  return (
    <HashRouter>
      <div>
        <h1>Planner</h1>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
