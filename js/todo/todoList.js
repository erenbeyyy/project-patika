
// GLOBAL DEĞİŞKENLER

const form = document.querySelector('#userForm')
const addInput = document.querySelector('#task')
const todoList = document.querySelector('#list')
const removeButton = document.querySelector('#list')
let todos = [];


runEvents();

// GENEL FONKSİYONLAR

function runEvents() {
    form.addEventListener('submit', addTodo)
    document.addEventListener('DOMContentLoaded', pageLoaded)
    removeButton.addEventListener('click', removeTodoToUI)
    donelist = addEventListener('click', listitemdone)
}

//SAYFA YÜKLENDİĞİNDE KAYDEDİLMİŞ LİST İTEMLERİ YERİNE KOY

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })
}

// İTEMLERİN ÜSTÜNE TIKLANDIĞINDA BG-COLOR YEŞİL OLSUN

function listitemdone(event) {
    if (event.target.className === "listitem d-flex justify-content-between align-items-center") {
        const listItem = event.target;
        listItem.className = "bg-success listitem d-flex justify-content-between align-items-center"
    } else if (event.target.className === "bg-success listitem d-flex justify-content-between align-items-center") {
        const listItem = event.target;
        listItem.className = "listitem d-flex justify-content-between align-items-center"
    }

}

// İTEMLERİ SİLMEK

function removeTodoToUI(event) {
    if (event.target.className === `float-right btn btn-outline-danger pb-0 pt-0`) {
        // EKRANDAN SİLME
        const todo = event.target.parentElement;
        todo.remove();
        // STORAGEDEN SİLME 
        const itemName = todo.firstChild.textContent;
        removeTodoToStorage(itemName);

    }
}

// LOCAL STORAGEDEN İTEMLERİ SİLMEK

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


//İTEMLERİ EKLEMEK VE TOASTLARIN GÖSTERİLMESİ

function addTodo(event) {
    const inputText = addInput.value.trim()
    if (inputText == null || inputText == "") {
        $(document).ready(function () {
            $('#liveToast2').toast({
                delay: 3000
            });
            $('#liveToast2').toast('show');
        });
    } else {
        // Arayüze Ekleme
        addTodoToUI(inputText);
        $(document).ready(function () {
            $('#liveToast1').toast({
                delay: 3000
            });
            $('#liveToast1').toast('show');
        });
        // Storage Ekleme
        addTodoToStorage(inputText);
    }


    event.preventDefault();
}

//ARAYÜZE İTEMLERİN EKLENMESİ

function addTodoToUI(newtodo) {
    const li = document.createElement('li')
    li.className = "listitem d-flex justify-content-between align-items-center"

    const itemName = document.createElement('p')
    itemName.textContent = newtodo
    itemName.className = "itemname mb-0"

    const button = document.createElement('button')
    button.className = "float-right btn btn-outline-danger pb-0 pt-0"
    button.textContent = "Sil"

    todoList.appendChild(li)
    li.appendChild(itemName)
    li.appendChild(button)

    addInput.value = ""
}

//LOCAL STORAGE İTEM EKLEME

function addTodoToStorage(newtodo) {
    checkTodosFromStorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// LOCAL STORAGE KONTROL

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

