const homePage = document.querySelector(".js-manipulated-container");
const homeButton = document.querySelector(".home-btn");

homeButton.addEventListener("click", () => {
    initializeHomePage()
    renderTasks()
    displayTaskProgress()
})

function initializeHomePage(){
    let homeHTML = `
        <div class="home-message">
            <p>Be productive today</p>
        </div>

        <div class="complete-pending-container">
            <div class="completed-home-container">
                <p class = "animate-pending-complete">Completed Tasks</p>
                <p class="completed-home-count animate-home-count">0</p>
            </div>
            <div class="pending-home-container">
                <p class = "animate-pending-complete">Pending Tasks</p>
                <p class="pending-home-count animate-home-count">0</p>
            </div>
        </div>

        <div class="tasks-progress">
            <div class="tasks-progress-details">
                <p class = "task-progress-header">Tasks Progress</p>
                <p class="completed-over-all">30/40 tasks done</p>
            </div>
            

            <div class="tasks-progress-chart">
                <canvas id="myChart" width="80" height="80"></canvas>
            </div>
        </div>

        <div class="added-tasks-grid">
            <p class="added-tasks-grid-header">Recently Added</p>
            <div class="added-tasks-container">
                
            </div>
        </div>
    `;

    homePage.innerHTML = homeHTML
    
}

initializeHomePage()


// ==========================|| Task Progress doughnut chart functionality ||=======================
function displayTaskProgress(){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
        datasets: [{
            data: [40, 10],
            borderRadius : 20,
            borderWidth: 0.05,
            backgroundColor :["rgb(25, 178, 122)","rgb(35, 34, 40)"],
            cutout: "80%",        
        }]
        },
        options: {
        responsive : true,
        plugins :{
            datalabels : {
            display : false
            },
            tooltip: {
                enabled : false
            },
        },
        scales: {
            r: {
            display : false
            }
        }
        
        }
    });
}

displayTaskProgress()

// =========================|| Increase textarea height functionality ||============================
function increaseTeaxtAreaHeight(){
    const textArea = document.querySelector("textarea");
    textArea.addEventListener("input", () => {
        textArea.style.height = "auto";
        textArea.style.height = (textArea.scrollHeight) + "px"
    })
}
increaseTeaxtAreaHeight()

// ========================|| Show Popup Container functionality ||=================================
const popUpContainer = document.querySelector(".popup-container");
function showPopup(){
    const addTaskBtn = document.querySelector(".add-new-tasks");
    addTaskBtn.addEventListener("click", () => {
        popUpContainer.style.display = "block"
    })
}
showPopup();


// =========================|| Hide Popup Container functionality ||================================
function hidePopup(){
    const hidePopupBtn = document.querySelector(".hide-pop-up-btn");
    hidePopupBtn.addEventListener("click", () => {
        popUpContainer.style.display = "none"
    });
}
hidePopup()

// ========================|| minimize sidebar functionality ||=====================================
const sidebarContainer = document.querySelector(".sidebar")
function minimizeSidebar(){
    const minimizeBtn = document.querySelector(".minimize-sidebar");

    minimizeBtn.addEventListener("click", () => {
        minimizeBtn.classList.toggle("rotate-minimize-button")
        sidebarContainer.classList.toggle("activate-sidebar");
    });
}
minimizeSidebar()

function toggleSidebar(){
    const toggleSidebarBtn = document.querySelector(".toggle-sidebar")
    toggleSidebarBtn.addEventListener("click", () => {
        sidebarContainer.classList.toggle("sidebar-switch")
    })
}
toggleSidebar()

// =============================|| Toggling dark and light theme functionality ||===================
function togglingTheme(){
    const lightThemeBtn = document.querySelector(".light-theme-btn");
    const darkThemeBtn = document.querySelector(".dark-theme-btn");
    const mainContainer = document.querySelector(".main-container");

    lightThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");       
        mainContainer.classList.toggle("light-mode");
    });

    darkThemeBtn.addEventListener("click", () => {
        mainContainer.classList.remove("light-mode");
        document.body.classList.remove("light-mode")
    })
}
togglingTheme()

const addingTasksbtn = document.querySelector(".add-task-btn");
addingTasksbtn.addEventListener("click", () => { 
    addTodo()  
});

export const myTasks = JSON.parse(localStorage.getItem("tasks")) || [];

export class Todo{
    constructor(task, details,date){
        this.task = task;
        this.details = details;
        this.date = date
    }
}

const taskName = document.querySelector(".js-task-name");
const taskDetails = document.querySelector(".js-task-details");
const dueDate = document.querySelector(".js-due-date");


function addTodo(){
    let addedTodo = new Todo(taskName.value, taskDetails.value, dueDate.value);

    let userTodo = `
        <div class="added-tasks-more-details-container">
            <div class="added-task">
                <div class="dragging-container-icon">
                    <i class="fa-solid fa-grip-vertical"></i>
                </div>
                <div class="added-task-details-container">
                    <div class="task-and-details-container">
                        <div class="task-name">
                            <input type="checkbox">
                            ${addedTodo.task}
                        </div>
                        <div class="task-details">
                            <button class="task-details-btn">
                                <span class = "tasks-removed-items">Show </span>more... 
                            </button>
                        </div> 
                    </div>

                    <div class="crud-task">
                        <p class = "due-date">Due <span class = "tasks-removed-items">date</span>: ${addedTodo.date} </p>
                        <button class="edit-tasks">
                            <span class = "tasks-removed-items">Edit</span>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button class="delete-task">
                            <span class = "tasks-removed-items">Delete</span>
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        
                        <p class="tasks-count-down">${daysCountDown()}<span class = "tasks-removed-items">left</span></p>
                    </div>
                </div>
                
                <div class="task-container-status">
                    <span></span>
                </div>
            </div>

            <div class="tasks-details-section">
                <p>
                    ${addedTodo.details}
                </p>
            </div>
        </div>

    `;

    myTasks.push(addedTodo);
    localStorage.setItem("tasks", JSON.stringify(myTasks))
    document.querySelector(".added-tasks-container").innerHTML += userTodo
    
}

//=========================|| Delete Tasks from localStorage functionality ||======================= 
function deleteTask(index){
    myTasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(myTasks))
    renderTasks()
}

//===========================|| Edit tasks logic ||=================================================
function editTasks(){
    if(localStorage.getItem("name")){
        taskName.value = localStorage.getItem("name")
    }

    else if(localStorage.getItem("details")){
        taskDetails.value = localStorage.getItem("details")
    }
    else if(localStorage.getItem("date")){
        dueDate.value = localStorage.getItem("date")
    }

    taskName.addEventListener("input", () => {
        localStorage.setItem("name", this.value)
    })

    taskDetails.addEventListener("input", () => {
        localStorage.setItem("details", this.value)
    })

    dueDate.addEventListener("input", () => {
        localStorage.setItem("date", this.value)
    })
    console.log(localStorage)
}


//========================|| Render Tasks to the DOM from localStorage ||===========================
function renderTasks(){
    const addedTasksContainer = document.querySelector(".added-tasks-container");
    addedTasksContainer.innerHTML = ""
    myTasks.forEach((task,index) => {
        const userTodo = `
            <div class="added-tasks-more-details-container">
            <div class="added-task">
                <div class="dragging-container-icon">
                    <i class="fa-solid fa-grip-vertical"></i>
                </div>
                <div class="added-task-details-container">
                    <div class="task-and-details-container">
                        <div class="task-name">
                            <input type="checkbox">
                            ${task.task}
                        </div>
                        <div class="task-details">
                            <button class="task-details-btn">
                                <span class = "tasks-removed-items">Show </span>more... 
                            </button>
                        </div> 
                    </div>

                    <div class="crud-task">
                        <p class = "due-date">Due <span class = "tasks-removed-items">date</span>: ${task.date} </p>
                        <button class="edit-tasks">
                            <span class = "tasks-removed-items">Edit</span>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button class="delete-task" data-index = "${index}">
                            <span class = "tasks-removed-items">Delete</span>
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        
                        <p class="tasks-count-down">${daysCountDown()}<span class = "tasks-removed-items"> left</span></p>
                    </div>
                </div>
                
                <div class="task-container-status">
                    <span></span>
                </div>
            </div>

            <div class="tasks-details-section">
                <p>
                    ${task.details}
                </p>
            </div>
        </div>
        `;

        addedTasksContainer.innerHTML += userTodo
    })

    //===========================|| Edit Tasks Functionality ||=====================================
    const addedTasks = document.querySelectorAll(".added-tasks-more-details-container");
    addedTasks.forEach((container) => {
        const editTasksBtn = container.querySelector(".edit-tasks");
        const popupDialog = container.querySelector(".popup-container")

        editTasksBtn.addEventListener("click", () => {
            editTasks()
            
        })
    })

    //============================|| Delete Tasks Functionality ||==================================
    const deleteTaskBtn = document.querySelectorAll(".delete-task");
        deleteTaskBtn.forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                deleteTask(index)     
            })
        })

    //=================|| Toggling show more details button ||======================================
    const taskDetailsHouse = document.querySelectorAll(".added-tasks-more-details-container");

    taskDetailsHouse.forEach((container) => {
        const taskDetails = container.querySelector(".tasks-details-section");
        const taskDetailsBtn = container.querySelector(".task-details-btn");

        taskDetailsBtn.addEventListener("click", () => {
            taskDetails.classList.toggle("show-more-details");

            if(taskDetailsBtn.textContent === "Show less..."){
                taskDetailsBtn.textContent = "Show more..."
            }
            else{
                taskDetailsBtn.textContent = "Show less..."
            }
        })
    })
   
}

// ============================ Deadline date function =============================================

const userDateInput = document.querySelector("#date-picker")

function daysCountDown(){

    let currentDate = new Date()
    let currentDay = currentDate.getDate()
    let currentMonth = currentDate.getMonth() + 1
    let currentYear = currentDate.getFullYear()

    let userDeadline = new Date(userDateInput.value)
    let deadlineDay = userDeadline.getDate()
    let deadlineMonth = userDeadline.getMonth()
    let deadlineYear = userDeadline.getFullYear()

    let differenceDay = deadlineDay - currentDay
    let differenceMonth = deadlineMonth -currentMonth
    let differenceYear = deadlineYear - currentYear

    if(userDeadline < currentDate || userDateInput.value === ""){
        return "Invalid date"
    }

    else{
        if(deadlineMonth >= currentMonth){
            differenceMonth = deadlineMonth - currentMonth
        }
        else {
            differenceYear = differenceYear - 1;
            differenceMonth = 12 + deadlineMonth - currentMonth
        }
    
        if(deadlineDay >= currentDay ){
            differenceDay = deadlineDay - currentDay
        }
        else {
            differenceMonth = differenceMonth - 1;
            differenceDay = getDaysInMonth(currentYear, currentMonth) + deadlineDay - currentDay
        }
    
        if(differenceMonth < 0){
            differenceMonth = 11;
            differenceYear = differenceYear -1;
        }
    
        return console.log(`${differenceYear}year(s), ${differenceMonth}month(s), ${differenceDay}day(s) `);
    }

    

}
daysCountDown()

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate()
}

// function updateTaskCounts() {
//     const completedTasks = myTasks.filter(task => task.completed).length;
//     const pendingTasks = myTasks.length - completedTasks;

//     document.querySelector(".completed-home-count").textContent = completedTasks;
//     document.querySelector(".pending-home-count").textContent = pendingTasks;

//     // Update task progress chart
//     const totalTasks = myTasks.length;
//     const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

//     // Update chart data dynamically
//     const ctx = document.getElementById('myChart');
//     const chart = Chart.getChart(ctx);
//     chart.data.datasets[0].data = [completedPercentage, 100 - completedPercentage];
//     chart.update();
// }

// Call updateTaskCounts on page load and after adding a task
// initializeHomePage();
// updateTaskCounts();

document.addEventListener("DOMContentLoaded", () => {
    renderTasks()
})