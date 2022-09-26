class TodoHtml {
    constructor(todo) {
        this.todoHtml = document.createElement("form");
        this.createTodoHtml(todo);
        return this.todoHtml;
    }

    createTodoHtml(todo) {
        this.createCsrftokenComponent(todo);
        this.createTextComponent(todo);
        this.createCompleteBtnComponent(todo);
        this.createDeleteBtnComponent();
        this.createIdComponent(todo);
        this.todoHtml.classList = ["d-flex todo shadow-sm py-3 px-2 mb-3 rounded"];
    }

    createCsrftokenComponent(todo) {
        const csrftokenContainer = document.createElement("input");
        csrftokenContainer.type = "hidden";
        csrftokenContainer.name = "csrfmiddlewaretoken";
        csrftokenContainer.value = todo.csrftoken;
        this.todoHtml.append(csrftokenContainer);
    }

    createTextComponent(todo) {
        const textContainer = document.createElement("span");
        textContainer.innerText = todo.text;
        textContainer.classList = ["flex-fill ps-3 py-2"];
        this.todoHtml.append(textContainer);
    }

    createCompleteBtnComponent(todo) {
        const completeBtnContainer = document.createElement("span");
        const completeCheckbox = document.createElement("input");
        const completeBtn = document.createElement("label");
        const completeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const completeIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        completeCheckbox.type = "checkbox";
        completeCheckbox.id = todo.id;
        completeCheckbox.style.visibility = "hidden";
        completeBtn.for = todo.id;
        completeBtnContainer.classList = ["d-flex"];
        completeBtnContainer.append(completeCheckbox);
        completeBtnContainer.append(completeBtn);
        completeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        completeIcon.setAttribute("width", "16");
        completeIcon.setAttribute("height", "16");
        completeIcon.setAttribute("fill", "currentColor");
        completeIcon.setAttribute("viewBox", "0 0 16 16");
        if (todo.isCompleted) {
            completeIcon.classList = ["bi bi-x-lg"];
            completeIconPath.setAttribute(
                "d",
                "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            );
            completeIcon.append(completeIconPath);
            completeBtn.append(completeIcon);
            completeBtn.classList = [
                "btn btn-outline-light border border-0 text-warning d-flex align-items-center",
            ];
        } else {
            completeIcon.classList = ["bi bi-check-lg"];
            completeIconPath.setAttribute(
                "d",
                "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
            );

            completeIcon.append(completeIconPath);
            completeBtn.append(completeIcon);
            completeBtn.classList = [
                "btn btn-outline-light border border-0 text-success d-flex align-items-center",
            ];
        }
        this.todoHtml.append(completeBtnContainer);
    }

    createDeleteBtnComponent() {
        const deleteBtnContainer = document.createElement("span");
        const deleteBtn = document.createElement("button");
        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const deleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        deleteBtnContainer.classList = ["d-flex"];
        deleteBtnContainer.append(deleteBtn);
        deleteIcon.setAttribute("width", "16");
        deleteIcon.setAttribute("height", "16");
        deleteIcon.setAttribute("fill", "currentColor");
        deleteIcon.setAttribute("viewBox", "0 0 16 16");
        deleteIcon.classList = ["bi bi-trash-fill"];
        deleteIconPath.setAttribute(
            "d",
            "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        );
        deleteIcon.append(deleteIconPath);
        deleteBtn.append(deleteIcon);
        deleteBtn.classList = [
            "btn btn-outline-light border border-0 text-danger d-flex align-items-center",
        ];
        this.todoHtml.append(deleteBtnContainer);
    }

    createIdComponent(todo) {
        const idContainer = document.createElement("input");
        idContainer.type = "hidden";
        idContainer.value = todo.id;
        this.todoHtml.append(idContainer);
    }
}
