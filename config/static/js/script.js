const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const csrftokenContainer = document.querySelector("form > input");
const todos = document.querySelectorAll(".todo");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value;
    const csrftoken = csrftokenContainer.value;
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
                updateCounter();
            })
            .catch((error) => console.log(error));
    }
});

const addEventListenerToBtns = function (todo) {
    const deleteBtn = todo.children[3].children[0];
    const completeBtn = todo.children[2].children[1];
    const todoCheckbox = todo.children[2].children[0];
    const idContainer = todo.children[4];
    const csrftokenContainer = todo.children[0];
    const id = idContainer.value;
    const csrftoken = csrftokenContainer.value;
    const payload = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    };

    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fetch("delete_todo", {
            method: "POST",
            headers: payload,
            body: JSON.stringify({ id }),
        })
            .then((response) => {
                todo.remove();
                updateCounter();
            })
            .catch((error) => console.log(error));
    });

    completeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isCompleted = todoCheckbox.checked;
        fetch("complete_todo", {
            method: "POST",
            headers: payload,
            body: JSON.stringify({ id, is_completed: isCompleted }),
        })
            .then((response) => {
                if (isCompleted) {
                    completeBtn.classList = [
                        "btn btn-outline-light border border-0 text-success d-flex align-items-center",
                    ];
                    completeBtn.children[0].classList = ["bi bi-check-lg"];
                    completeBtn.children[0].children[0].setAttribute(
                        "d",
                        "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                    );
                    todoCheckbox.checked = false;
                } else {
                    completeBtn.classList = [
                        "btn btn-outline-light border border-0 text-warning d-flex align-items-center",
                    ];
                    completeBtn.children[0].classList = ["bi bi-x-lg"];
                    completeBtn.children[0].children[0].setAttribute(
                        "d",
                        "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                    );
                    todoCheckbox.checked = true;
                }
            })
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
        this.completeCheckbox = document.createElement("input");
        this.completeBtn = document.createElement("label");
        this.deleteBtn = document.createElement("button");
        this.idContainer = document.createElement("input");
        this.csrftokenContainer = document.createElement("input");
        this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.deleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.completeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.completeIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.createTodoHtml(todo);
        return this.todoHtml;
    }

    createTodoHtml(todo) {
        this.csrftokenContainer.type = "hidden";
        this.csrftokenContainer.name = "csrfmiddlewaretoken";
        this.csrftokenContainer.value = todo.csrftoken;
        this.textContainer.innerText = todo.text;
        this.textContainer.classList = ["flex-fill ps-3 py-2"];
        this.createCompleteBtns(todo);
        this.deleteBtnContainer.classList = ["d-flex"];
        this.deleteBtnContainer.append(this.deleteBtn);
        this.idContainer.type = "hidden";
        this.idContainer.value = todo.id;

        this.todoHtml.append(this.csrftokenContainer);
        this.todoHtml.append(this.textContainer);
        this.todoHtml.append(this.completeBtnContainer);
        this.todoHtml.append(this.deleteBtnContainer);
        this.todoHtml.append(this.idContainer);
        this.todoHtml.classList = ["d-flex todo shadow-sm py-3 px-2 mb-3 rounded"];

        this.deleteIcon.setAttribute("width", "16");
        this.deleteIcon.setAttribute("height", "16");
        this.deleteIcon.setAttribute("fill", "currentColor");
        this.deleteIcon.setAttribute("viewBox", "0 0 16 16");
        this.deleteIcon.classList = ["bi bi-trash-fill"];
        this.deleteIconPath.setAttribute(
            "d",
            "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        );

        this.deleteIcon.append(this.deleteIconPath);
        this.deleteBtn.append(this.deleteIcon);
        this.deleteBtn.classList = [
            "btn btn-outline-light border border-0 text-danger d-flex align-items-center",
        ];
    }

    createCompleteBtns(todo) {
        this.completeCheckbox.type = "checkbox";
        this.completeCheckbox.id = todo.id;
        this.completeCheckbox.style.visibility = "hidden";
        this.completeBtn.for = todo.id;
        this.completeBtnContainer.classList = ["d-flex"];
        this.completeBtnContainer.append(this.completeCheckbox);
        this.completeBtnContainer.append(this.completeBtn);

        this.completeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.completeIcon.setAttribute("width", "16");
        this.completeIcon.setAttribute("height", "16");
        this.completeIcon.setAttribute("fill", "currentColor");
        this.completeIcon.setAttribute("viewBox", "0 0 16 16");
        console.log(todo.isCompleted);
        if (todo.isCompleted) {
            this.completeIcon.classList = ["bi bi-x-lg"];
            this.completeIconPath.setAttribute(
                "d",
                "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            );

            this.completeIcon.append(this.completeIconPath);
            this.completeBtn.append(this.completeIcon);
            this.completeBtn.classList = [
                "btn btn-outline-light border border-0 text-warning d-flex align-items-center",
            ];
        } else {
            this.completeIcon.classList = ["bi bi-check-lg"];
            this.completeIconPath.setAttribute(
                "d",
                "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
            );

            this.completeIcon.append(this.completeIconPath);
            this.completeBtn.append(this.completeIcon);
            this.completeBtn.classList = [
                "btn btn-outline-light border border-0 text-success d-flex align-items-center",
            ];
        }
    }
}

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", (e) => {
    const visibility = menu.style.visibility;
    if (visibility === "hidden") {
        menu.style.visibility = "visible";
        menuBtn.style.backgroundColor = "red";
    }
    if (visibility === "visible") {
        menu.style.visibility = "hidden";
    }
});

const filterAllBtn = document.getElementById("filter-all");
const filterCompletedBtn = document.getElementById("filter-completed");
const filterPendingBtn = document.getElementById("filter-pending");

filterAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("filter_all", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((todos) => {
            todoList.innerHTML = "";
            if (todos.todos.length) {
                for (var todoObject of todos.todos) {
                    const todo = {
                        id: todoObject.pk,
                        text: todoObject.fields.text,
                        isCompleted: todoObject.fields.is_completed,
                        csrftoken: todos.csrftoken,
                    };
                    const todoHtml = new TodoHtml(todo);
                    addEventListenerToBtns(todoHtml);
                    todoList.append(todoHtml);
                }
                menuBtn.children[1].textContent = "All";
                menu.style.visibility = "hidden";
                updateCounter();
            }
        })
        .catch((error) => console.log(error));
});

filterCompletedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("filter_completed", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((todos) => {
            todoList.innerHTML = "";
            console.log(todos);
            if (todos.todos.length) {
                for (var todoObject of todos.todos) {
                    const todo = {
                        id: todoObject.pk,
                        text: todoObject.fields.text,
                        isCompleted: todoObject.fields.is_completed,
                        csrftoken: todos.csrftoken,
                    };
                    const todoHtml = new TodoHtml(todo);
                    addEventListenerToBtns(todoHtml);
                    todoList.append(todoHtml);
                }
                menuBtn.children[1].textContent = "Completed";
                menu.style.visibility = "hidden";
                updateCounter("completed");
            }
        })
        .catch((error) => console.log(error));
});

filterPendingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("filter_pending", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((todos) => {
            console.log(todos);
            todoList.innerHTML = "";
            if (todos.todos.length) {
                for (var todoObject of todos.todos) {
                    console.log(todoObject);
                    const todo = {
                        id: todoObject.pk,
                        text: todoObject.fields.text,
                        isCompleted: todoObject.fields.is_completed,
                        csrftoken: todos.csrftoken,
                    };
                    const todoHtml = new TodoHtml(todo);
                    addEventListenerToBtns(todoHtml);
                    todoList.append(todoHtml);
                }
                menuBtn.children[1].textContent = "Pending";
                menu.style.visibility = "hidden";
                updateCounter("pending");
            }
        })
        .catch((error) => console.log(error));
});

const updateCounter = function (status = "") {
    todoList.length;
    const counter = document.getElementById("counter");
    counter.textContent = `You have ${todoList.children.length} ${status} task`;
};
