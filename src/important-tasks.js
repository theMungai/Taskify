const importantTasksPage = document.querySelector(".js-manipulated-container");
const importantTasksBtn = document.querySelector(".important-tasks-btn");

importantTasksBtn.addEventListener("click", () => {
    initializeImportantTasksPage()
})

function initializeImportantTasksPage(){
    let importantTasksHtml = `
        <div class="important-tasks-main-container">
            <header>
                <h1>Important Tasks</h1>
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

    importantTasksPage.innerHTML = importantTasksHtml
}