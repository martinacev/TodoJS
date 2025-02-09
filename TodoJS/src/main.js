document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  const todoInput = document.getElementById("todo-input");
  const saveButton = document.getElementById("save-button");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
      todoList.innerHTML = "";
      todos.forEach((todo, index) => {
          const todoItem = document.createElement("div");
          todoItem.classList.add("todo-item");
          todoItem.innerHTML = `
              <input type="checkbox" ${todo.done ? "checked" : ""} onchange="toggleDone(${index})" />
              <span class="text" contenteditable="true" onblur="editTodo(${index}, this.innerText)">${todo.text}</span>
              <button onclick="deleteTodo(${index})">🗑</button>
          `;
          if (todo.done) {
              todoItem.querySelector("span").classList.add("completed");
          }
          todoList.appendChild(todoItem);
      });
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  function addTodo() {
      if (todoInput.value.trim() === "") return;
      todos.push({ text: todoInput.value, done: false });
      todoInput.value = "";
      renderTodos();
  }

  window.deleteTodo = function(index) {
      todos.splice(index, 1);
      renderTodos();
  }

  window.toggleDone = function(index) {
      todos[index].done = !todos[index].done;
      renderTodos();
  }

  window.editTodo = function(index, newText) {
      todos[index].text = newText;
      renderTodos();
  }

  saveButton.addEventListener("click", addTodo);
  renderTodos();
});
