const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList")

// addTaskBtn.addEventListener("click", () => {             //если нажимают кнопку то выполняется код {}
//     const taskText = taskInput.value;                    // получаю то, что ввел пользователь
    
//     if (taskInput === "") {                              // проверка на пустоту; === это строгая проверка 
//         alert("Введите задачу");
//         return;
//     }

//     const li = document.createElement("li");
//     li.textContent = taskText;                           //кладем текст в li

//     taskList.appendChild(li);                            //кладем li в список ul              

//     taskInput.value ="";                                 //после ввода поле становится пустым 
// });

loadTasks();                // вызываем функцию, которая подгружает сохранённые задачи из localStorage
 
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();                //trim убирает лишние пробелы

    if (taskText === "") {
        alert("Введите задачу");
        return;
    }

    addTask(taskText)
    taskInput.value = "";
});

function addTask(text, completed = false) {         //принимает задачу и понимает, она комплит или нет
    const li = document.createElement("li");

    li.innerHTML = `
    <span class="task-text">${text}</span>
    <button class="delete-btn">Удалить задачу</button>
    `

    if (completed) {
        li.classList.add("completed");
    }

    //клик по задаче - она выполнена
    li.addEventListener("click", () => {
        li.classList.toggle("completed")
        saveTasks();
    });

    taskList.appendChild(li);                      //кладем li в список ul
    saveTasks();                                   //сохраняем после добавления
}

//сохранение задач
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach((li) => {  //перебор всех задач в списке
        tasks.push({
            text:li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed"),
        });
    });

    //сохраняем массив в локал сторэдж
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//загрузка задач
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; //если сторэжд пуст, то берем пуст массив

    tasks.forEach((task) => {
        addTask(task.text, task.completed);
    });
}