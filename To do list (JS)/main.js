const myNewTask = document.querySelector('.addtask')
const myNewTaskbtn = document.querySelector('.add')
const myDeleteBtn = document.querySelector('.Delete')
const myList  = document.querySelector('.tasks')
const myNewTaskAdded = document.createElement('div')
const dellAll = document.querySelector('.add2')

let arrayOfTasks = []

if (window.localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem('tasks'))
    
    
}

dellAll.onclick = () =>{
    window.localStorage.clear()
    myList.innerHTML=''
}

myNewTaskbtn.onclick = function(){
    if ( myNewTask.value !== '' ) {
        myList.innerHTML = ''
        addedTasktoarry(myNewTask.value);
        myNewTask.value= ''
    }
}

getTaskfromlocal()
myList.addEventListener('click',(e) =>{
    if (e.target.classList.contains('del')) {
        deletetask(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains('task')){
        toggleStatusWith(e.target.getAttribute('data-id'))
        e.target.classList.toggle('done')
    }
})
function addedTasktoarry(tasktext) {
    const task = {
        id : Date.now(),
        title : tasktext,
        completed : false,
    };
    arrayOfTasks.push(task);
    addTaskToLocalS(arrayOfTasks);
    getTaskfromlocal(arrayOfTasks);
}


function addElementsToThePage(arrayOfTasks){
    myNewTask.innerHTML = '';
    arrayOfTasks.forEach((task) => {
        let divTask = document.createElement('div');
        divTask.className = 'task';
        if (task.completed) {
            divTask.className = 'task done';
        }
        divTask.setAttribute('data-id',task.id);
        divTask.appendChild(document.createTextNode(task.title));
        let span = document.createElement('span')
        span.className = 'del'
        span.appendChild(document.createTextNode('Delete'))
        divTask.append(span);
        myList.append(divTask);
        })
}

function addTaskToLocalS(arrayOfTasks) {
    window.localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
    
}

function getTaskfromlocal() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToThePage(tasks);
    }
    
}

function deletetask(taskid)  {
    arrayOfTasks = arrayOfTasks.filter((task) => { task.id != taskid });
    addTaskToLocalS(arrayOfTasks)
}



function toggleStatusWith(taskid){
    for (let i = 0; i < arrayOfTasks; i++) {
        if(arrayOfTasks[i].id == taskid){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);        }
        addTaskToLocalS(arrayOfTasks)
    }
}    
