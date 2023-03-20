import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref, onValue, orderByValue, equalTo, query, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const taskInputEl = document.getElementById("taskInputEl")
const b5 = document.getElementById("b5")
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

const bucket5Ref = ref(database, "b5")
const bucket0Ref = ref(database, "b0")
const bucket1Ref = ref(database, "b1")
const bucket2Ref = ref(database, "b2")
const bucket3Ref = ref(database, "b3")
const bucket4Ref = ref(database, "b4")
const bucket6Ref = ref(database, "b6")
const bucket7Ref = ref(database, "b7")
const bucket8Ref = ref(database, "b8")
const bucket9Ref = ref(database, "b9")
// console.log(eval(`bucket9Ref`))

let bucketArray = []

addBtn.addEventListener("click", pushIntoDB)

function pushIntoDB() {
    if (taskInputEl.value) {
        push(bucket5Ref, taskInputEl.value)
        taskInputEl.value = ""
    }
    else {
        taskInputEl.placeholder = "Fill this field"
        setTimeout(function () {
            taskInputEl.placeholder = "Add task"
        }, 1500)
    }
}

function handleDrag(e, firstTaskId) {
    // to avoid the input elements or the buckets
    console.log("inhere")
    if (e.target.classList.contains("listItems")) {
        let dataArray = [e.target.id, e.target.parentElement.id, firstTaskId]
        console.log(JSON.stringify(dataArray))
        e.dataTransfer.setData("text", JSON.stringify(dataArray))
    }
}
function handleDragOver(e) {
    e.preventDefault()
}

// to avoid appending in a task
// e.target.appendChild(document.getElementById(data))
// query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount'));
// alert(query)

function handleDrop(e) {
    e.preventDefault()
    let data = JSON.parse(e.dataTransfer.getData("text"))
    // console.log(data, document.getElementById(data[0]).textContent, `bucket${this.id[1]}Ref`, eval(`bucket${this.id[1]}Ref`))
    if (e.target.classList.contains("buckets")) {
        push(eval(`bucket${this.id[1]}Ref`), document.getElementById(data[0]).textContent)
    }
    let oldBucketRef = eval(`bucket${data[1][1]}Ref`)
    // let query = oldBucketRef.orderByValue().equalTo(document.getElementById(data[0]).textContent);
    let exactLocationOfItemInDB = ref(database, `b${data[1][1]}/${data[2]}`)
    console.log(exactLocationOfItemInDB)
    remove(exactLocationOfItemInDB)

    // const topUserPostsRef = query(oldBucketRef, orderByValue());
    // const topUserPostsRef1 = query(topUserPostsRef, equalTo(document.getElementById(data[0]).textContent))
    // const queryConstraints = [orderByValue(), equalTo(document.getElementById(data[0]).textContent)];
    // const getData = fetch(query(oldBucketRef, ...queryConstraints))
    //     .then(data => () => {
    //         console.log(data)
    //     })
    // const getData = async () => {
    //     const country = await get(query(oldBucketRef, ...queryConstraints));
    //     if (country.exists()) {
    //         console.log("found by name", country.val());
    //     } else {
    //         console.log("No data available");
    //         return null;
    //     }
    // }
    // const getData = async () => {
    //     const readNewLogEntries = await get(
    //         query(oldBucketRef, orderByValue(), equalTo(document.getElementById(data[0]).textContent))
    //     );
    //     console.log(readNewLogEntries.val())
    //     return readNewLogEntries.val();
    // };
    // console.log(getData())
    // const topUserPostsRef2 = query(topUserPostsRef1, onValue(oldBucketRef, function (snapshot) {
    //     snapshot.forEach(function (childSnapshot) {
    //         var childData = childSnapshot.val();
    //         console.log(childData);
    //     })
    // }));
    // console.log(topUserPostsRef, topUserPostsRef1.val())
    // let bucketRef = ref(database, data[1]);
    // console.log(bucketRef)
}

// using allListItems doesn't allow dropping into buckets
allBuckets.forEach(function (bucket) {
    // bucket.addEventListener("dragstart", handleDrag)
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
    // console.log(e.code)
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

onValue(bucket5Ref, function (snapshot) {
    fetchData(snapshot, "b5")
})
onValue(bucket1Ref, function (snapshot) {
    fetchData(snapshot, "b1")
})
onValue(bucket2Ref, function (snapshot) {
    fetchData(snapshot, "b2")
})
onValue(bucket3Ref, function (snapshot) {
    fetchData(snapshot, "b3")
})
onValue(bucket4Ref, function (snapshot) {
    fetchData(snapshot, "b4")
})
onValue(bucket6Ref, function (snapshot) {
    fetchData(snapshot, "b6")
})
onValue(bucket7Ref, function (snapshot) {
    fetchData(snapshot, "b7")
})
onValue(bucket8Ref, function (snapshot) {
    fetchData(snapshot, "b8")
})

onValue(bucket9Ref, function (snapshot) {
    fetchData(snapshot, "b9")
})

function appendBucket(taskArray, bucketId, taskEntries) {
    for (let task of taskEntries) {
        console.log(bucketId, task[0], task[1])
        let listEl = document.createElement("li")
        listEl.textContent = task[1]
        listEl.setAttribute("draggable", "true")
        listEl.setAttribute("id", uuidv4())
        listEl.classList.add("listItems")
        listEl.addEventListener("click", handleTaskClick)
        document.getElementById(bucketId).append(listEl)
        listEl.addEventListener("dragstart", (e) => {
            console.log("DragEvent: ", task[0])
            handleDrag(e, task[0])
        })
    }
}

function fetchData(snapshot, bucketId) {
    console.log(bucketId)
    document.getElementById(bucketId).innerHTML = ""
    if (snapshot.val()) {
        let taskArray = Object.values(snapshot.val())
        let taskEntries = Object.entries(snapshot.val())
        appendBucket(taskArray, bucketId, taskEntries)
    }
}