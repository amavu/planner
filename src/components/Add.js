import { ReactComponent as ClockIcon } from "../icons/clock-iso-color.svg";

export const Add = () => {
  return (
    <div className="add-container">
      <form className="add-form">
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
        <div className="buttons-add">
          <button className="cancel-add-button">CANCEL</button>
          <button className="add-button">ADD</button>
        </div>
      </form>
    </div>
  );
};
