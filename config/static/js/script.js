const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const csrftokenHtml = document.querySelector("form > input");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value;
    const csrftoken = csrftokenHtml.value;

    fetch("addTodo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ text }),
    })
        .then((response) => response.json())
        .then((result) => {
            const todo = new TodoHtml(result);
            todo.addToList(todoList);
            todoInput.value = "";
        })
        .catch((error) => console.log(error));
});

class TodoHtml {
    constructor(todo) {
        this.todoHtml = document.createElement("form");
        this.textContainer = document.createElement("span");
        this.completeBtnContainer = document.createElement("span");
        this.deleteBtnContainer = document.createElement("span");
        this.completeBtn = document.createElement("button");
        this.deleteBtn = document.createElement("button");
        this.idContainer = document.createElement("input");
        this.createTodoHtml(todo);
    }

    createTodoHtml(todo) {
        this.textContainer.innerText = todo.text;
        this.textContainer.classList = ["col-10"];
        this.completeBtn.innerText = "O";
        this.deleteBtn.innerText = "X";
        this.completeBtnContainer.append(this.completeBtn);
        this.completeBtnContainer.classList = ["col-1"];
        this.deleteBtnContainer.append(this.deleteBtn);
        this.deleteBtnContainer.classList = ["col-1"];
        this.idContainer.type = "hidden";
        this.idContainer.value = todo.id;
        this.todoHtml.append(this.textContainer);
        this.todoHtml.append(this.completeBtnContainer);
        this.todoHtml.append(this.deleteBtnContainer);
        this.todoHtml.append(this.idContainer);
        this.todoHtml.classList = ["row"];
    }

    addToList(todoList) {
        todoList.append(this.todoHtml);
    }
}
