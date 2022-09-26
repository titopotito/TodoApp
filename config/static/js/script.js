const todos = document.querySelectorAll(".todo");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const csrftokenContainer = document.querySelector("form > input");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const filterAllBtn = document.getElementById("filter-all");
const filterCompletedBtn = document.getElementById("filter-completed");
const filterPendingBtn = document.getElementById("filter-pending");

// MENU BUTTON EVENT LISTENER
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

// ADD TODO EVENT LISTENER
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value;
    const csrftoken = csrftokenContainer.value;
    if (text) {
        fetch("add", {
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

// COMPLETE AND DELETE BUTTON EVENT LISTENER
for (var todo of todos) {
    addEventListenerToBtns(todo);
}

function addEventListenerToBtns(todo) {
    const deleteBtn = todo.children[3].children[0];
    const completeBtn = todo.children[2].children[1];
    const todoCheckbox = todo.children[2].children[0];
    const idContainer = todo.children[4];
    const id = idContainer.value;
    const csrftokenContainer = todo.children[0];
    const csrftoken = csrftokenContainer.value;
    const payload = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    };

    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fetch("delete", {
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
        fetch("toggle", {
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
}

// FILTER BUTTON EVENT LISTENER
filterAllBtn.addEventListener("click", (e) => filter("All"));
filterCompletedBtn.addEventListener("click", (e) => filter("Completed"));
filterPendingBtn.addEventListener("click", (e) => filter("Pending"));

const filter = function (params) {
    fetch(`filter/${params}`, {
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
                updateCounter();
            }
            menuBtn.children[1].textContent = params;
            menu.style.visibility = "hidden";
        })
        .catch((error) => console.log(error));
};

const updateCounter = function (status = "") {
    todoList.length;
    const counter = document.getElementById("counter");
    counter.textContent = `You have ${todoList.children.length} ${status} task`;
};
