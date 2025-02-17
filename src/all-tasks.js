const allTasksPage = document.querySelector(".js-manipulated-container");
const allTasksBtn = document.querySelector(".all-tasks-btn");

allTasksBtn.addEventListener("click", () => {
    initializeAllTasksPage()
})

function initializeAllTasksPage(){
    let allTasksHTML = `
        <div class="all-tasks-main-container">
            <header>
                <h1>All Tasks</h1>
            </header>
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
                                    Task
                                </div>
                                <div class="task-details">
                                    <button class="task-details-btn">
                                        <span class = "tasks-removed-items">Show </span>more... 
                                    </button>
                                </div> 
                            </div>

                            <div class="crud-task">
                                <p class = "due-date">Due <span class = "tasks-removed-items">date</span>:</p>
                                <button class="edit-tasks">
                                    <span class = "tasks-removed-items">Edit</span> 
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>

                                <button class="delete-task">
                                    Delete
                                    <span class = "tasks-removed-items">Delete</span>
                                </button>
                                
                                <p class="tasks-count-down">20 days <span class = "tasks-removed-items">left</span></p>
                            </div>
                        </div>
                        
                        <div class="task-container-status">
                            <span></span>
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

    allTasksPage.innerHTML = allTasksHTML
}