let input = document.querySelector("#todo");
let bisness = document.querySelector("#bisness");
let personal = document.querySelector("#personal");
let add = document.querySelector(".add");
let list = document.querySelector(".list");

let newTask = {
  task: "",
  type: false,
  done: false,
};

GetTodoList();
console.log(new Date().toLocaleDateString());
function GetTodoList() {
  if (!localStorage.getItem("todo-list")) {
    localStorage.setItem("todo-list", "[]");
  }
  let data = JSON.parse(localStorage.getItem("todo-list"));
  list.innerHTML = "";
  data.forEach((elem, index) => {
    const listItem = document.createElement("li");

    const divCheck = document.createElement("div");
    const divButton = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", index);

    const span = document.createElement("span");
    span.className = elem.type ? "bisness_check" : "personal_check";

    const checkbox = document.createElement("input");
    checkbox.id = index;
    checkbox.type = "checkbox";
    checkbox.checked = elem.done;
    checkbox.className = "checked";
    checkbox.addEventListener("click", () => DoneTask(index));

    const textDiv = document.createElement("div");
    textDiv.className = elem.done ? "completed" : "";
    textDiv.textContent = elem.task;
    textDiv.setAttribute("contentEditable", false);

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => EditTask(index, textDiv));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => Delete(index));

    label.appendChild(checkbox);
    label.appendChild(span);

    divCheck.appendChild(label);
    divCheck.appendChild(textDiv);
    divButton.appendChild(editButton);
    divButton.appendChild(deleteButton);

    listItem.appendChild(divCheck);
    listItem.appendChild(divButton);

    list.appendChild(listItem);
  });
}

add.addEventListener("click", () => {
  if (!input.value) {
    alert("Заполните поле");
  } else {
    newTask.task = input.value;
    AddTask(newTask);
    console.log(newTask);
  }
});

bisness.addEventListener("click", () => {
  newTask.type = true;
  personal.checked = false;
});

personal.addEventListener("click", () => {
  newTask.type = false;
  bisness.checked = false;
});

function DoneTask(index) {
  let data = JSON.parse(localStorage.getItem("todo-list"));
  data[index].done = !data[index].done;
  console.log(data[index]);
  localStorage.setItem("todo-list", JSON.stringify(data));
  GetTodoList();
}

function AddTask(task) {
  let data = JSON.parse(localStorage.getItem("todo-list"));
  data.push(task);
  localStorage.setItem("todo-list", JSON.stringify(data));
  input.value = "";
  GetTodoList();
}

function Delete(index) {
  let data = JSON.parse(localStorage.getItem("todo-list"));
  data.splice(index, 1);
  localStorage.setItem("todo-list", JSON.stringify(data));
  GetTodoList();
}

function EditTask(index, textDiv) {
  textDiv.setAttribute("contentEditable", true);
  textDiv.focus();
  textDiv.style.outline = "none";
  textDiv.style.cursor = "text";
  textDiv.addEventListener("blur", () => SaveEdit(index, textDiv.textContent));
}

function SaveEdit(index, editedText) {
  let data = JSON.parse(localStorage.getItem("todo-list"));
  data[index].task = editedText;
  localStorage.setItem("todo-list", JSON.stringify(data));
  GetTodoList();
}