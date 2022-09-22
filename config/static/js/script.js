const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const csrftokenHtml = document.querySelector("form > input");
const todos = document.querySelectorAll(".todo");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value;
    const csrftoken = csrftokenHtml.value;
    if (text) {
        fetch("add_todo", {
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
                addEventListenerToBtns(todo);
                todoList.append(todo);
                todoInput.value = "";
            })
            .catch((error) => console.log(error));
    }
});

const addEventListenerToBtns = function (todo) {
    const deleteBtn = todo.children[3].children[0];
    const idContainer = todo.children[4];
    const csrftokenContainer = todo.children[0];
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = idContainer.value;
        const csrftoken = csrftokenContainer.value;
        fetch("delete_todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => todo.remove())
            .catch((error) => console.log(error));
    });
};

for (var todo of todos) {
    addEventListenerToBtns(todo);
}

class TodoHtml {
    constructor(todo) {
        this.todoHtml = document.createElement("form");
        this.textContainer = document.createElement("span");
        this.completeBtnContainer = document.createElement("span");
        this.deleteBtnContainer = document.createElement("span");
        this.completeBtn = document.createElement("button");
        this.deleteBtn = document.createElement("button");
        this.idContainer = document.createElement("input");
        this.csrftokenContainer = document.createElement("input");
        this.createTodoHtml(todo);
        return this.todoHtml;
    }

    createTodoHtml(todo) {
        this.csrftokenContainer.type = "hidden";
        this.csrftokenContainer.name = "csrfmiddlewaretoken";
        this.csrftokenContainer.value = todo.csrftoken;
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
        this.todoHtml.append(this.csrftokenContainer);
        this.todoHtml.append(this.textContainer);
        this.todoHtml.append(this.completeBtnContainer);
        this.todoHtml.append(this.deleteBtnContainer);
        this.todoHtml.append(this.idContainer);
        this.todoHtml.classList = ["row todo"];
    }
}
