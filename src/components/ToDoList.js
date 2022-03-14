import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  getToDoList,
  getToDoListById,
  deleteToDoList,
  shareToDoListWithUser,
  checkToDo,
} from "../services/services";
import { useParams, Link, useHistory } from "react-router-dom";
import { ToDoItem } from "./ToDoItem";

export const ToDoList = ({ checkLoginStatus }) => {
  const [toDoList, setToDoList] = useState();
  const [toDoListInfo, setToDoListInfo] = useState();
  const [shareEmailText, setShareEmailText] = useState("");
  const [showShareError, setShowShareError] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { todolistId } = useParams();
  const history = useHistory();

  useEffect(async () => {
    if (checkLoginStatus) {
      const toDos = await getToDoList(todolistId);
      const toDoList = await getToDoListById(todolistId);
      const token = localStorage.getItem("plannertoken");
      const payload = jwtDecode(token);
      if (payload.id == toDoList.owner) {
        setIsOwner(true);
      }
      setToDoList(toDos);
      setToDoListInfo(toDoList);
    } else {
      console.log("Not authorized");
    }
  }, []);

  const handleDeleteTodoList = async (e) => {
    e.preventDefault();
    await deleteToDoList(todolistId);
    history.push("/todolists");
  };

  const handleShareToUser = async (e) => {
    e.preventDefault();
    try {
      await shareToDoListWithUser(todolistId, shareEmailText);
      setShowShareSuccess(true);
      setShowShareError(false);
    } catch (error) {
      console.log(error);
      setShowShareSuccess(false);
      setShowShareError(true);
    }
  };

  return (
    <div className="to-do-list-container">
      <h2>{toDoListInfo && toDoListInfo.name.toUpperCase()}</h2>
      {showShareError && <span>Sharing failed</span>}
      {showShareSuccess && <span>List shared</span>}
      {isOwner && (
        <div>
          <input
            type="text"
            placeholder="EMAIL TO SHARE"
            className="input-style"
            name="share-todolist-input"
            value={shareEmailText}
            onChange={(e) => setShareEmailText(e.target.value)}
          />
          <button onClick={(e) => handleShareToUser(e)}>SHARE</button>
        </div>
      )}
      <Link to={`/add-todo/${todolistId}`}>
        <button className="add-to-do-button">ADD TO DO</button>
      </Link>
      <div className="to-do-list-items">
        {toDoList &&
          toDoList.map((todo, index) => {
            return <ToDoItem todo={todo} key={index} />;
          })}
      </div>
      {isOwner && (
        <button
          onClick={(e) => handleDeleteTodoList(e)}
          className="delete-todo-list"
        >
          DELETE THIS LIST
        </button>
      )}
    </div>
  );
};
