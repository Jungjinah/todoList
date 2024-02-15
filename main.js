//user가 값을 입력한다.
//+버튼을 클릭하면 할 일이 추가된다.
//delete 버튼을 누르면 할 일이 삭제된다.
//check 버튼을 누르면 할 일이 밑줄이 그어진다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝남으로 간주하고 밑줄
//3. false이면 끝나지 않은걸로 간주하고 그대로

//진행 중 끝남 탭을 누르면, 언더바가 이동한다.
//끝난탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let list = [];
let mode = "all";

let underLine = document.getElementById("under-line");

//할 일 추가버튼
addButton.addEventListener("click", addTask);

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    });
}

//enterKey 추가
function enterKey(e) {
    if(e.key == "Enter") {
        addTask();
    }
}

//할 일 추가
function addTask() {
    let task =  {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    
    if (task.taskContent == "" || task.taskContent == null) {
        alert("할 일을 적어주세욤!");
        taskInput.focus();
    } else {
        if(task.taskContent.length > 30) {
            alert("30자까지 입력 가능해욤")
        } else {
            taskList.push(task);
            render();
        }
    }
}

function render() {
    //내가 선택한 탭에 따라  + 리스트를 달리 보여준다.
    if(mode === "all") {
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        list = filterList;
    }
    
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML+= `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button class="btn-area resetBtn" onclick="toggleComplete('${list[i].id}')">RESET</button>
                <button class="btn-area delBtn" onclick="deleteTask('${list[i].id}')">DEL</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="btn-area checkBtn" onclick="toggleComplete('${list[i].id}')">CHECK</button>
            <button class="btn-area delBtn" onclick="deleteTask('${list[i].id}')">DEL</button>
        </div>
    </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    taskInput.value = "";
}

function toggleComplete(id) {
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2,9);
}

function deleteTask(id) {
    const delChk = confirm("정말 삭제할거에욤??");
    
    if(delChk == true) {   
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].id == id) {
                taskList.splice(i, 1);
                break;
            }
        }
        filter();
    }
}

function filter(e) {
    console.log("e : ", e);

    if(e) {
        mode = e.target.id;
        underLine.style.left = e.currentTarget.offsetLeft + "px";
        underLine.style.width = e.currentTarget.offsetWidth + "px";
        underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 4 + "px";
    }

    console.log("mode :" , mode);
    filterList = [];
    
    if (mode === "ongoing") {
        //진행 중인 아이템
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "done") {
        //끝난 아이템
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}
