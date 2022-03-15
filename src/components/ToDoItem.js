import { checkToDo } from "../services/services";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ToDoItem = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.checked);

  const handleCheckToDo = async (e, todoId) => {
    e.preventDefault();
    const newToDo = await checkToDo(todoId, e.target.checked);
    setIsChecked(newToDo.checked);
  };

  const formatDate = (starttime) => {
    const date = new Date(starttime);
    let hours = `${date.getHours()}`.padStart(2, "0");
    let minutes = `${date.getMinutes()}`.padStart(2, "0");
    const displayTime = hours + ":" + minutes;
    return displayTime;
  };

  return (
    <div className="to-do-item">
      <Link className="to-do-item-text" to={`/edit-todo/${todo.id}`}>
        <span>{todo.text}</span>
      </Link>
      <span className="to-do-item-start-time">
        {formatDate(todo.starttime)}
      </span>
      <input
        onChange={(e) => handleCheckToDo(e, todo.id)}
        type="checkbox"
        checked={isChecked}
      />
    </div>
  );
};
