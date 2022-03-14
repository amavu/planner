import { useEffect, useState } from "react";
import { getToDoLists, createToDoList } from "../services/services";
import jwtDecode from "jwt-decode";
import DatePicker from "react-datepicker";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../icons/calendar-iso-gradient.svg";

export const ToDoLists = ({ loggedInUserInfo, checkLoginStatus }) => {
  const [toDoLists, setToDoLists] = useState();
  const [listName, setListName] = useState();
  const [toDoDate, setToDoDate] = useState(new Date());
  const history = useHistory();

  useEffect(async () => {
    if (checkLoginStatus) {
      const token = localStorage.getItem("plannertoken");
      const payload = jwtDecode(token);
      console.log(payload);
      const toDoLists = await getToDoLists(payload.id);
      setToDoLists(toDoLists);
    } else {
      history.push("/");
      console.log("Not authorized");
    }
  }, []);

  const handleCreateToDoList = async (e) => {
    console.log(loggedInUserInfo);
    if (!loggedInUserInfo || listName === "") {
      return;
    }
    e.preventDefault();
    console.log(loggedInUserInfo);
    const newList = {
      name: listName,
      day: toDoDate.toISOString(),
      owner: loggedInUserInfo.id,
    };
    await createToDoList(newList);
    const toDoLists = await getToDoLists(loggedInUserInfo.id);
    setToDoLists(toDoLists);
  };

  return (
    <div className="to-do-lists-container">
      <h2>MY TO DO LISTS:</h2>
      <CalendarIcon width="300px" height="262px" />
      <input
        type="text"
        placeholder="NAME TO DO LIST"
        className="input-style"
        name="todolist"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <DatePicker
        selected={toDoDate}
        onChange={(date) => setToDoDate(date)}
        dateFormat="dd/MM/yyyy"
      />
      <button
        onClick={(e) => handleCreateToDoList(e)}
        className="add-new-list-button"
      >
        ADD NEW LIST
      </button>
      <div className="to-do-lists">
        {toDoLists &&
          toDoLists.map((todolist, index) => {
            return (
              <div className="to-do-lists-item" key={index}>
                <Link to={`/todolist/${todolist.id}`}>
                  <button className="list-button">
                    {todolist.name.toUpperCase()}
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
