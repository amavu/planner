import "./App.scss";
import jwtDecode from "jwt-decode";
import { HashRouter, Route, Switch, Link, useHistory } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { SignUp } from "./components/SignUp";
import { Profile } from "./components/Profile";
import { Edit } from "./components/Edit";
import { Add } from "./components/Add";
import { EditToDo } from "./components/EditToDo";
import { useEffect, useState } from "react";
import { ToDoList } from "./components/ToDoList";
import { ToDoLists } from "./components/ToDoLists";
import { Logout } from "./components/Logout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState();
  const history = useHistory();

  useEffect(async () => {
    const token = localStorage.getItem("plannertoken");
    if (token) {
      const payload = jwtDecode(token);
      await setLoggedInUserInfo(payload);
    } else {
      history.push("/");
    }
  }, []);

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
        <div className="app-links-container">
          <Link className="planner-header" to="/todolists">
            <h1>Planner</h1>
          </Link>
          {loggedInUserInfo && (
            <Link className="profile-link" to="/profile">
              <span>Profile</span>
            </Link>
          )}
          {loggedInUserInfo && (
            <Link className="logout-link" to="/logout">
              <span>Log Out</span>
            </Link>
          )}
        </div>
        <Switch>
          <Route exact path="/">
            <Homepage
              checkLoginStatus={() => checkLoginStatus()}
              onLoginChange={() => handleLoginStatusChange()}
            />
          </Route>
          <Route path="/signup">
            <SignUp />
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
          <Route path="/profile">
            <Profile loggedInUserInfo={loggedInUserInfo} />
          </Route>
          <Route path="/edit">
            <Edit loggedInUserInfo={loggedInUserInfo} />
          </Route>
          <Route path="/logout">
            <Logout removeLoggedInUser={() => setLoggedInUserInfo()} />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
