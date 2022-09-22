const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = new TodoHtml(todoInput.value);
    todo.addToList(todoList);
    todoInput.value = "";
});

class TodoHtml {
    constructor(todo) {
        this.todoHtml = document.createElement("div");
        this.textContainer = document.createElement("span");
        this.completeBtnContainer = document.createElement("span");
        this.deleteBtnContainer = document.createElement("span");
        this.completeBtn = document.createElement("button");
        this.deleteBtn = document.createElement("button");
        this.createTodoHtml(todo);
    }

    createTodoHtml(todo) {
        this.textContainer.innerText = todo;
        this.textContainer.classList = ["col-10"];
        this.completeBtn.innerText = "O";
        this.deleteBtn.innerText = "X";
        this.completeBtnContainer.append(this.completeBtn);
        this.completeBtnContainer.classList = ["col-1"];
        this.deleteBtnContainer.append(this.deleteBtn);
        this.deleteBtnContainer.classList = ["col-1"];
        this.todoHtml.append(this.textContainer);
        this.todoHtml.append(this.completeBtnContainer);
        this.todoHtml.append(this.deleteBtnContainer);
        this.todoHtml.classList = ["row"];
    }

    addToList(todoList) {
        todoList.append(this.todoHtml);
    }
}
