import { ReactComponent as ClockIcon } from "../icons/clock-iso-color.svg";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { createToDo } from "../services/services";

export const Add = () => {
  const { todolistId } = useParams();
  const [todoText, setTodoText] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const history = useHistory();

  const handleAddToDos = async (e) => {
    e.preventDefault();
    const todo = {
      text: todoText,
      startTime: startTime.toISOString(),
      checked: false,
      todolistId: todolistId,
    };
    await createToDo(todo);
    history.push(`/todolist/${todolistId}`);
  };
  return (
    <div className="add-container">
      <form className="add-form">
        <label className="input-label" htmlFor="todo">
          TO DO
          <input
            className="input-style"
            type="text"
            name="todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </label>
        <label className="input-label" htmlFor="time">
          <div className="time-input-label">
            <ClockIcon className="clock-svg" />
          </div>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </label>
        <div className="buttons-add">
          <Link to={`/todolist/${todolistId}`}>
            <button className="cancel-add-button">CANCEL</button>
          </Link>
          <button onClick={(e) => handleAddToDos(e)} className="add-button">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};
