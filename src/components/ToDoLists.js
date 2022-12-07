import { useEffect, useState } from "react";
import { getToDoLists, createToDoList } from "../services/services";
import jwtDecode from "jwt-decode";
import DatePicker from "react-datepicker";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "../icons/calendar-iso-gradient.svg";

export const ToDoLists = ({ loggedInUserInfo }) => {
  const [toDoLists, setToDoLists] = useState();
  const [listName, setListName] = useState("");
  const [toDoDate, setToDoDate] = useState(new Date());
  const history = useHistory();
  const token = localStorage.getItem("plannertoken");
 

  useEffect(async () => {
    if (token) {
      const payload = jwtDecode(token);
      const toDoLists = await getToDoLists(payload.id);
      setToDoLists(toDoLists);
    } else {
      history.push("/");
      console.log("Not authorized");
    }
  }, [token, history]);

  const handleCreateToDoList = async (e) => {
    if (!loggedInUserInfo || listName === "") {
      return;
    }
    e.preventDefault();
    const newList = {
      name: listName,
      day: toDoDate.toISOString(),
      owner: loggedInUserInfo.id,
    };
    await createToDoList(newList);
    const toDoLists = await getToDoLists(loggedInUserInfo.id);
    setToDoLists(toDoLists);
  };

  const formatDate = (isoDateString) => {
    const date = isoDateString.split("T")[0];
    const datelist = date.split("-");
    const startDayString = datelist[2] + "/" + datelist[1] + "/" + datelist[0];
    return startDayString;
  };

  const sortTodoListByDate = (todolist) => {
    return todolist.sort((a, b) => a.day < b.day ? -1 : 1)
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
          sortTodoListByDate(toDoLists).map((todolist, index) => {
            return (
              <div className="to-do-lists-item" key={index}>
                <Link to={`/todolist/${todolist.id}`}>
                  <button className="list-button">
                    <span> {todolist.name && todolist.name.toUpperCase()} 
                      </span>
                    <span>{formatDate(todolist.day)}</span>
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
