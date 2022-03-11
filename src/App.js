import "./App.scss";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { SignUp } from "./components/SignUp";
import { Edit } from "./components/Edit";
import { Add } from "./components/Add";
import { EditToDo } from "./components/EditToDo";

const App = () => {
  return (
    <HashRouter>
      <div className="app-container">
        <h1>Planner</h1>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/edit-todo">
            <EditToDo />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
