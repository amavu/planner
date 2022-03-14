import { useEffect, useState } from "react";
import { getToDoList, deleteToDoList } from "../services/services";
import { useParams, Link, useHistory } from "react-router-dom";

export const ToDoList = ({ checkLoginStatus }) => {
  const [toDoList, setToDoList] = useState();
  const { todolistId } = useParams();
  const history = useHistory();

  useEffect(async () => {
    if (checkLoginStatus) {
      const toDos = await getToDoList(todolistId);
      setToDoList(toDos);
    } else {
      console.log("Not authorized");
    }
  }, []);

  const handleDeleteTodoList = async (e) => {
    e.preventDefault();
    await deleteToDoList(todolistId);
    history.push("/todolists");
  };

  return (
    <div className="to-do-list-container">
      <h2>TO DO LIST:</h2>
      <Link to={`/add-todo/${todolistId}`}>
        <button className="add-to-do-button">ADD TO DO</button>
      </Link>
      <div className="to-do-list-items">
        {toDoList &&
          toDoList.map((todo, index) => {
            return (
              <div className="to-do-item" key={index}>
                <Link className="to-do-item-text" to={`/edit-todo/${todo.id}`}>
                  <span>{todo.text}</span>
                </Link>
                <span className="to-do-item-start-time">{todo.starttime}</span>
                <input type="checkbox" className="" />
              </div>
            );
          })}
      </div>
      <button
        onClick={(e) => handleDeleteTodoList(e)}
        className="delete-todo-list"
      >
        DELETE THIS LIST
      </button>
    </div>
  );
};
