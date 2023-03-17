import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const taskInputEl = document.getElementById("taskInputEl")
const mainTaskList = document.getElementById("mainTaskList")
const addBtn = document.getElementById("addBtn")

const appSettings = {
    databaseURL: ""
    //removed url for now
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const tasklistInDB = ref(database, "bucketTasks")

addBtn.addEventListener("click", function () {
    push(tasklistInDB, taskInputEl.value)
    taskInputEl.value = ""
})

onValue(tasklistInDB, function (snapshot) {
    mainTaskList.innerHTML=""
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
        mainTaskList.append(listEl)
    }
}
