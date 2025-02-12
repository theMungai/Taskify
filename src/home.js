const homePage = document.querySelector(".js-manipulated-container");
const homeButton = document.querySelector(".home-btn");

homeButton.addEventListener("click", () => {
    initializeHomePage()
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
    displayTaskProgress()
}

initializeHomePage()

// Task Progress doughnut chart functionality
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


// Show Popup Container functionality
const popUpContainer = document.querySelector(".popup-container");
function showPopup(){
    const addTaskBtn = document.querySelector(".add-new-tasks");
    addTaskBtn.addEventListener("click", () => {
        popUpContainer.style.display = "block"
    })
}
showPopup();


// Hide Popup Container functionality
function hidePopup(){
    const hidePopupBtn = document.querySelector(".hide-pop-up-btn");
    hidePopupBtn.addEventListener("click", () => {
        popUpContainer.style.display = "none"
    });
}

//  minimize sidebar functionality
function minimizeSidebar(){
    const minimizeBtn = document.querySelector(".minimize-sidebar");
    const sidebarContainer = document.querySelector(".sidebar")

    minimizeBtn.addEventListener("click", () => {
        minimizeBtn.classList.toggle("rotate-minimize-button")
        sidebarContainer.classList.toggle("activate-sidebar");
    });
}
minimizeSidebar()

// Toggling dark and light theme functionality
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

class Todo{
    constructor(task, details,date){
        this.task = task;
        this.details = details;
        this.date = date
    }
}

const taskName = document.querySelector(".js-task-name");
const taskDetails = document.querySelector(".js-task-details");
const dueDate = document.querySelector(".js-due-date");

const myTasks = JSON.parse(localStorage.getItem("tasks")) || [];


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
                                More details... 
                            </button>
                        </div> 
                    </div>

                    <div class="crud-task">
                        <p class = "due-date">Due date: ${addedTodo.date} </p>
                        <button class="edit-tasks">
                            Edit 
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button class="delete-task">
                            Delete
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        
                        <p class="tasks-count-down">20 days left</p>
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

const addingTasksbtn = document.querySelector(".add-task-btn");
addingTasksbtn.addEventListener("click", () => {
    addTodo()
    hidePopup()   
});

function updateTaskCounts() {
    const completedTasks = myTasks.filter(task => task.completed).length;
    const pendingTasks = myTasks.length - completedTasks;

    document.querySelector(".completed-home-count").textContent = completedTasks;
    document.querySelector(".pending-home-count").textContent = pendingTasks;

    // Update task progress chart
    const totalTasks = myTasks.length;
    const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    // Update chart data dynamically
    const ctx = document.getElementById('myChart');
    const chart = Chart.getChart(ctx);
    chart.data.datasets[0].data = [completedPercentage, 100 - completedPercentage];
    chart.update();
}

// Call updateTaskCounts on page load and after adding a task
initializeHomePage();
updateTaskCounts();

