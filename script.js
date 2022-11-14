let addBtn, todoList, todoTask, todoListBox, inputType, inputName, inputPlace, inputTime, allResetBtns, menu, personalParaCounter, businessParaCounter, personalTask, businessTask
let businessCounter = 0
let personalCounter = 0
let completedTasks = 0

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
    handleData()
}

const prepareDOMElements = () => {
    todoList = document.querySelector('.todoList')
    todoListBox = document.querySelector('.todoList__tasks--box')
    inputType = document.querySelector('[data-id="type"]')
    inputName = document.querySelector('[data-id="name"]')
    inputPlace = document.querySelector('[data-id="place"]')
    inputTime = document.querySelector('[data-id="time"]')
    addBtn = document.querySelector('.todoList__menu--confirmBtn')
    allResetBtns = document.querySelectorAll('.todoList__menu--content-resetBtn')
    menu = document.querySelector('.todoList__menu')
    personalParaCounter = document.querySelector('.todoList__info--counter-personal span')
    businessParaCounter = document.querySelector('.todoList__info--counter-business span')
    personalTask = `<span class="material-symbols-outlined">person</span>`
    businessTask = `<span class="material-symbols-outlined">work</span>`
}

const prepareDOMEvents = () => {
    todoList.addEventListener('click', handleMenu)
    addBtn.addEventListener('click', handleCreator)
    allResetBtns.forEach(btn => btn.addEventListener('click', resetInputValue));
    todoListBox.addEventListener('dblclick', handleComplete)
}

const handleMenu = e => {
    const openMenu = document.querySelector('.todoList__tasks--footer-openMenu')
    const returnBtn = document.querySelector('.todoList__menu--return')

    if (e.target === openMenu) {
        menu.classList.toggle('menuShow')
    } else if (e.target === returnBtn) {
        menu.classList.remove('menuShow')
    }
}

const handleData = () => {
    const todoData = document.querySelector('.todoList__info--date')
    const date = new Date()
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    todoData.textContent = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`
}

const createTask = () => {
    todoTask = document.createElement('div')
    todoTask.classList.add('todoList__tasks--item')

    createTaskIcon()
    createTaskContent()

    todoListBox.append(todoTask)
}

const createTaskIcon = () => {
    const taskIcon = document.createElement('div')
    taskIcon.classList.add('todoList__tasks--item-icon')

    if (inputType.value === 'personal') {
        taskIcon.innerHTML = personalTask
        todoTask.setAttribute('data-type', 'personal')
        personalCounter++
    } else {
        taskIcon.innerHTML = businessTask
        todoTask.setAttribute('data-type', 'business')
        businessCounter++
    }

    handleCounter()
    todoTask.append(taskIcon)
}

const createTaskContent = () => {
    const taskContent = document.createElement('div')
    const taskHeader = document.createElement('p')
    const taskName = document.createElement('span')
    const taskTime = document.createElement('span')
    const taskPlace = document.createElement('p')

    taskContent.classList.add('todoList__tasks--item-content')
    taskHeader.classList.add('todoList__tasks--item-heading')
    taskName.classList.add('todoList__tasks--item-name')
    taskTime.classList.add('todoList__tasks--item-time')
    taskPlace.classList.add('todoList__tasks--item-place')

    taskName.textContent = inputName.value

    if (inputTime.value < 12) {
        taskTime.textContent = `${inputTime.value}am`
    } else {
        taskTime.textContent = `${inputTime.value}pm`
    }

    taskPlace.textContent = inputPlace.value

    taskHeader.append(taskName, taskTime)
    taskContent.append(taskHeader, taskPlace)
    todoTask.append(taskContent)
}

const handleCreator = () => {
    const errorText = document.querySelector('.todoList__menu--content-errorText')
    const allInputs = document.querySelectorAll('input')
    const regex = '^(([0-9])|([0-1][0-9])|([2][0-3]))$'

    if (inputName.value !== '' && inputTime.value.match(regex) && inputPlace.value !== '') {
        createTask()
        allInputs.forEach(input => input.value = '')
        menu.classList.remove('menuShow')
        errorText.textContent = ''
    } else if (inputName.value === '' || inputPlace.value === '' || inputTime.value === '') {
        errorText.textContent = 'Make up all of inputs!'
    } else if (!inputTime.value.match(regex)) {
        errorText.textContent = 'Time input has incorrect value!'
    }
}

const resetInputValue = e => {
    e.target.previousElementSibling.value = ''
}

const handleCounter = () => {
    personalParaCounter.textContent = personalCounter
    businessParaCounter.textContent = businessCounter
}

const handleComplete = e => {
    const completedPara = document.querySelector('.todoList__tasks--footer-completed span')

    if (e.target.closest('.todoList__tasks--item').getAttribute('data-type') === 'personal') {
        personalCounter--
        handleCounter()
    } else {
        businessCounter--
        handleCounter()
    }

    e.target.closest('.todoList__tasks--item').remove()
    completedTasks++
    completedPara.textContent = completedTasks
}

document.addEventListener('DOMContentLoaded', main)

