// Session
//const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://localhost:8080"; // remember to change to heroku page!

export function getLoginToken({ email, password }) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export function getUserById(id) {
  return fetch(`${API_URL}/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function createUser(user) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response.json();
  });
}

export function editUser(user) {
  return fetch(`${API_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function deleteUser() {
  console.log("Delete user function call");
  return fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("plannertoken"),
    },
  }).then((res) => res.json());
}

export function getToDoList(todolistId) {
  return fetch(`${API_URL}/todos/${todolistId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getToDoLists(userId) {
  return fetch(`${API_URL}/todolists/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function createToDoList(todolist) {
  return fetch(`${API_URL}/todolists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todolist),
  }).then((response) => {
    return response.json();
  });
}

export function createToDo(todo) {
  return fetch(`${API_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => {
    return response.json();
  });
}

export function editToDo(todo) {
  return fetch(`${API_URL}/todo/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => {
    return response.json();
  });
}

export function getToDoById(id) {
  return fetch(`${API_URL}/todo/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getToDoListById(id) {
  return fetch(`${API_URL}/todolist/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function deleteToDo(id) {
  return fetch(`${API_URL}/todo/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export function deleteToDoList(id) {
  return fetch(`${API_URL}/todolist/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
