import { ReactComponent as ClockIcon } from "../icons/clock-iso-color.svg";

export const EditToDo = () => {
  return (
    <div className="edit-todo-container">
      <form className="edit-todo-form">
        <label className="input-label" htmlFor="todo">
          TO DO
          <input className="input-style" type="text" name="todo" />
        </label>
        <label className="input-label" htmlFor="time">
          <div className="time-input-label">
            <ClockIcon className="clock-svg" />
            <span>TIME</span>
          </div>
          <input className="input-style" type="text" name="time" />
        </label>
        <div className="buttons-edit-todo">
          <button className="cancel-edit-todo-button">CANCEL</button>
          <button className="save-edit-todo-button">SAVE</button>
        </div>
      </form>
    </div>
  );
};
