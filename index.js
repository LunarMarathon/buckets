import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const taskInputEl = document.getElementById("taskInputEl")
const mainTaskList = document.getElementById("mainTaskList")
const addBtn = document.getElementById("addBtn")
const allBuckets = document.querySelectorAll(".buckets")
// const allListItems = document.querySelectorAll(".items")
let textSelectedId = ""

const appSettings = {
    databaseURL: ""
    //removed url for now
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const tasklistInDB = ref(database, "bucketTasks")

addBtn.addEventListener("click", pushIntoDB)

function pushIntoDB() {
    push(tasklistInDB, taskInputEl.value)
    taskInputEl.value = ""
}

onValue(tasklistInDB, function (snapshot) {
    mainTaskList.innerHTML = ""
    if (snapshot.val()) {
        let taskArray = Object.values(snapshot.val())
        // alert(taskArray)
        appendTaskUl(taskArray)
    }
})

function appendTaskUl(taskArray) {
    for (let task of taskArray) {
        let listEl = document.createElement("li")
        listEl.textContent = task
        listEl.setAttribute("draggable", "true")
        listEl.setAttribute("id", uuidv4())
        listEl.classList.add("listItems")
        listEl.addEventListener("click", handleTaskClick)
        mainTaskList.append(listEl)
    }
}
function handleDrag(e) {
    // to avoid the input elements or the buckets
    if (e.target.classList.contains("listItems"))
        e.dataTransfer.setData("text", e.target.id)
}
function handleDragOver(e) {
    e.preventDefault()
}
function handleDrop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData("text")
    // to avoid appending in a task
    if (e.target.classList.contains("buckets"))
        e.target.appendChild(document.getElementById(data))
}

// using allListItems doesn't allow dropping into buckets
allBuckets.forEach(function (bucket) {
    bucket.addEventListener("dragstart", handleDrag)
    bucket.addEventListener("dragover", handleDragOver)
    bucket.addEventListener("drop", handleDrop)
})

function handleTaskClick() {
    for (let task of document.querySelectorAll(".taskSelected")) {
        task.classList.remove("taskSelected")
    }
    this.classList.add("taskSelected")
    textSelectedId = this.id
}

document.addEventListener("keydown", function (e) {
    console.log(e.code)
    switch (e.code) {
        case "Numpad1":
            document.getElementById("b7").append(document.getElementById(textSelectedId))
            break
        case "Numpad2":
            document.getElementById("b8").append(document.getElementById(textSelectedId))
            break
        case "Numpad3":
            document.getElementById("b9").append(document.getElementById(textSelectedId))
            break
        case "Numpad4":
            document.getElementById("b4").append(document.getElementById(textSelectedId))
            break
        case "Numpad6":
            document.getElementById("b6").append(document.getElementById(textSelectedId))
            break
        case "Numpad7":
            document.getElementById("b1").append(document.getElementById(textSelectedId))
            break
        case "Numpad8":
            document.getElementById("b2").append(document.getElementById(textSelectedId))
            break
        case "Numpad9":
            document.getElementById("b3").append(document.getElementById(textSelectedId))
            break
        case "Enter":
            pushIntoDB()
            break
    }
})