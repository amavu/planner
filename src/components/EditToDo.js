import { ReactComponent as ClockIcon } from "../icons/clock-iso-color.svg";
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { editToDo, getToDoById, deleteToDo } from "../services/services";
import { ReactComponent as TrashIcon } from "../icons/trash-can-iso-color.svg";

export const EditToDo = () => {
  const { todoId } = useParams();
  const [editText, setEditText] = useState("");
  const [editStartTime, setEditStartTime] = useState(new Date());
  const [todoListId, setTodoListId] = useState();
  const history = useHistory();

  useEffect(async () => {
    const fetchToDoById = async (id) => {
      return await getToDoById(id);
    };
    const todo = await fetchToDoById(todoId);
    setTodoListId(todo.todolistid);
    setEditText(todo.text);
    setEditStartTime(new Date(todo.starttime));
  }, []);

  const handleChanges = async (e) => {
    e.preventDefault();
    if (editText == "" || editStartTime == undefined) {
      return;
    } else {
      const editedTodo = {
        id: todoId,
        text: editText,
        startTime: editStartTime.toISOString(),
      };

      await editToDo(editedTodo);
      history.push(`/todolist/${todoListId}`);
    }
  };

  const handleDeleteTodo = async (e) => {
    e.preventDefault();
    await deleteToDo(todoId);
    history.push(`/todolist/${todoListId}`);
  };
  return (
    <div className="edit-todo-container">
      <form className="edit-todo-form">
        <label className="input-label" htmlFor="todo">
          TO DO
          <input
            className="input-style"
            type="text"
            name="todo"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </label>
        <label className="input-label" htmlFor="time">
          <div className="time-input-label">
            <ClockIcon className="clock-svg" />
          </div>
          <DatePicker
            selected={editStartTime}
            onChange={(date) => setEditStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </label>
        <div className="buttons-edit-todo">
          <Link to={`/todolist/${todoListId}`}>
            <button className="cancel-edit-todo-button">CANCEL</button>
          </Link>
          <button
            onClick={(e) => handleChanges(e)}
            className="save-edit-todo-button"
          >
            SAVE
          </button>
        </div>
        <div className="edit-delete-trash-can">
          <TrashIcon onClick={(e) => handleDeleteTodo(e)} />
        </div>
      </form>
    </div>
  );
};
