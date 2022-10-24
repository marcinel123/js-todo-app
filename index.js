let userName;
let todos;

if (localStorage.getItem("userName") === null) {
  userName = prompt("Please start with entering your name");
  if (userName === null) {
    userName = "Stranger :)";
  }
  document.querySelector(".main-heading").innerText = `Hello Dear ${userName}`;
  localStorage.setItem("userName", userName);
} else {
  userName = localStorage.getItem("userName");
  document.querySelector(".main-heading").innerText = `Hello Dear ${userName}`;
}

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const buttons = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("checkbox");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("work");
    }

    content.classList.add("todo-content");
    buttons.classList.add("buttons");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" 
    value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    buttons.appendChild(edit);
    buttons.appendChild(deleteBtn);
    todoItem.appendChild(buttons);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    edit.addEventListener("click", () => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");
  console.log(todos);
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});
