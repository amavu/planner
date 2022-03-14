import "./App.scss";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { SignUp } from "./components/SignUp";
import { Edit } from "./components/Edit";
import { Add } from "./components/Add";
import { EditToDo } from "./components/EditToDo";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { ToDoList } from "./components/ToDoList";
import { ToDoLists } from "./components/ToDoLists";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState();

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  const checkLoginStatus = () => {
    try {
      if (loggedInUserInfo) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginStatusChange = () => {
    console.log("on login changed");
    const token = localStorage.getItem("plannertoken");
    const payload = jwtDecode(token);
    setLoggedInUserInfo(payload);
    setIsLoggedIn(!!localStorage.getItem("plannertoken"));
  };

  return (
    <HashRouter>
      <div className="app-container">
        <Link to="/todolists">
          <h1>Planner</h1>
        </Link>
        <Switch>
          <Route exact path="/">
            <Homepage
              isLoggedIn={isLoggedIn}
              onLoginChange={() => handleLoginStatusChange()}
            />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/todolists">
            <ToDoLists
              loggedInUserInfo={loggedInUserInfo}
              checkLoginStatus={() => checkLoginStatus()}
            />
          </Route>
          <Route exact path="/todolist/:todolistId">
            <ToDoList checkLoginStatus={() => checkLoginStatus()} />
          </Route>
          <Route path="/add-todo/:todolistId">
            <Add />
          </Route>
          <Route path="/edit-todo/:todoId">
            <EditToDo />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
