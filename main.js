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
let taskList = [];

//할 일 추가버튼
addButton.addEventListener("click", addTask);

function enterKey(e) {
    console.log("e: ", e);
    if(e.key == "Enter") {
        addTask();
    }
}

function addTask() {
    let task =  {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    
    if (task.taskContent == "" || task.taskContent == null) {
        alert("할 일을 적어주세요!");
        taskInput.focus();
    } else {
        taskList.push(task);
        console.log(taskList);
        render();
    }
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML+= `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button class="btn-area resetBtn" onclick="toggleComplete('${taskList[i].id}')">RESET</button>
                <button class="btn-area delBtn" onclick="deleteTask()">DEL</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button class="btn-area checkBtn" onclick="toggleComplete('${taskList[i].id}')">CHECK</button>
            <button class="btn-area delBtn" onclick="deleteTask()">DEL</button>
        </div>
    </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    taskInput.value = "";
}

function toggleComplete(id) {
    console.log("id: ", id);
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2,9);
}

function deleteTask() {

}