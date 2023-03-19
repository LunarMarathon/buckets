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
const bucketlistInDB = ref(database, "indiBucketTasks")
let bucketArray = []

addBtn.addEventListener("click", pushIntoDB)

function pushIntoDB() {
    if (taskInputEl.value) {
        push(tasklistInDB, taskInputEl.value)
        taskInputEl.value = ""
    }
    else {
        taskInputEl.placeholder = "Fill this field"
        setTimeout(function () {
            taskInputEl.placeholder = "Add task"
        }, 1500)
    }
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
        // e.target.appendChild(document.getElementById(data))
        push(bucketlistInDB, document.getElementById(data).textContent)
}

// using allListItems doesn't allow dropping into buckets
allBuckets.forEach(function (bucket) {
    bucket.addEventListener("dragstart", handleDrag)
    bucket.addEventListener("dragover", handleDragOver)
    bucket.addEventListener("drop", handleDrop)
    // It's better to push when the task is dropped itself
    // bucket.addEventListener("DOMSubtreeModified", handleChange)
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

// function handleChange() {
//     if (this.id != "b5") {
//         // console.log("changed")
//         // alert("changed")
//         let tasksArray = document.getElementById(this.id).getElementsByTagName("li")
//         // for (let a of tasksArray) {
//         //     console.log(a)
//         // }
//         let lastTask = tasksArray[tasksArray.length - 1].textContent
//         push(bucketlistInDB, lastTask)
//     }
// }

// onValue(bucketlistInDB, function (snapshot) {
//     bucketArray = Object.values(snapshot.val())
//     console.log(bucketArray)
//     // document.getElementById("b1").innerHTML=""
// })


// for (let task of bucketArray){
//     console.log(task)
//     let listEl = document.createElement("li")
//     listEl.textContent = task
//     listEl.setAttribute("draggable", "true")
//     listEl.setAttribute("id", uuidv4())
//     listEl.classList.add("listItems")
//     listEl.addEventListener("click", handleTaskClick)
//     document.getElementById("b1").append(listEl)
// }

onValue(bucketlistInDB, function(snapshot){
    fetch(snapshot, "b1")
})

function appendBucket(taskArray, bucketId) {
    for (let task of taskArray) {
        let listEl = document.createElement("li")
        listEl.textContent = task
        listEl.setAttribute("draggable", "true")
        listEl.setAttribute("id", uuidv4())
        listEl.classList.add("listItems")
        listEl.addEventListener("click", handleTaskClick)
        document.getElementById(bucketId).append(listEl)
    }
}

function fetch(snapshot, bucketId) {
    document.getElementById(bucketId).innerHTML = ""
    if (snapshot.val()) {
        let taskArray = Object.values(snapshot.val())
        appendBucket(taskArray, bucketId)
    }}