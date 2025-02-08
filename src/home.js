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
                <p>Completed Tasks</p>
                <p class="completed-home-count">0</p>
            </div>
            <div class="pending-home-container">
                <p>Pending Tasks</p>
                <p class="pending-home-count">0</p>
            </div>
        </div>

        <div class="tasks-progress">
            <div class="tasks-progress-details">
                <p>Tasks Progress</p>
                <p class="completed-over-all">30/40 tasks done</p>
            </div>
            

            <div class="tasks-progress-chart">
                <canvas id="myChart" width="80" height="80"></canvas>
            </div>
        </div>

        <div class="added-tasks-grid">
            <p class="added-tasks-grid-header">Recently Added</p>
            <div class="added-tasks-container">
                <div class="added-tasks-more-details-container">
                    <div class="added-task">
                        <div class="dragging-container-icon">
                            <i class="fa-solid fa-grip-vertical"></i>
                        </div>
                        <div class="added-task-details-container">
                            <div class="task-and-details-container">
                                <div class="task-name">
                                    <input type="checkbox">
                                    Task Name
                                </div>
                                <div class="task-details">
                                    <button class="task-details-btn">
                                        More details... 
                                    </button>
                                </div> 
                            </div>

                            <div class="crud-task">
                                <p class = "due-date">Due date: </p>
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
                            <span>ss</span>
                        </div>
                    </div>

                    <div class="tasks-details-section">
                        <p>
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    `;

    homePage.innerHTML = homeHTML
    displayTaskProgress()
}

initializeHomePage()


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
