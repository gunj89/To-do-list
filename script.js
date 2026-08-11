const inputBox = document.getElementById("inputField");
const listContainer = document.getElementById("listContainer");
function addTask() {
    if (inputBox.value === '') {
        alert("You have to add a task");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.prepend(li);
        const checked = document.createElement("input");
        checked.type = "checkbox";
        li.appendChild(checked);
        checked.onclick = function () {
            if (checked.checked) {
                li.style.textDecoration = "line-through";
                li.style.color = "gray";
            }
            else {
                li.style.textDecoration = "none";
                li.style.color = "black";
            }
            saveData();
        }
        const dltBtn = document.createElement("button");
        dltBtn.innerHTML = "❌";
        li.appendChild(dltBtn);
        inputBox.value = "" //empty the field after one task added.
        saveData();
        dltBtn.onclick = function () {
            li.remove();
            saveData();
        }
    }
}
inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "INPUT") {
        const li = e.target.parentElement;
        if (e.target.checked) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        } else {
            li.style.textDecoration = "none";
            li.style.color = "black";
        }
        saveData();
    }
});