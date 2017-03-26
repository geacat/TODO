const KEY_CODE_ENTER = 13;
const FILTER_ALL = 1;
const FILTER_ACTIVE = 2;
const FILTER_COMPLETED = 3;
const TODOS_ID = 'TODOS_ID';
const TODOS_FILTER_ID = 'TODOS_FILTER_ID';

var elements = {
    selectAll: document.querySelector('.todos__selectall'),
    newTodo: document.querySelector('.todos__newtodo'),
    list: document.querySelector('.todos__list'),
    counter: document.querySelector('.todos__counter'),
    filter1: document.querySelector('.todos__showall'),
    filter2: document.querySelector('.todos__showactive'),
    filter3: document.querySelector('.todos__showcompleted'),
    clearCompleted: document.querySelector('.todos__footer > a')
}

elements.selectAll.addEventListener('change', onSelectAllChange);
elements.newTodo.addEventListener('keydown', onNewTodoKeyDown);
elements.filter1.addEventListener('click', onFilterClick);
elements.filter2.addEventListener('click', onFilterClick);
elements.filter3.addEventListener('click', onFilterClick);
elements.clearCompleted.addEventListener('click', onClearCompletedClick);

var todos = readTodos();
var currentFilter = readFilter();

createViewTodos();

////////////////////////////////////////////////// TODOS //////////////////////////////////////////////////
function readTodos() {
    var todoslist = window.localStorage.getItem(TODOS_ID);
    return JSON.parse(todoslist) || [];
}

function writeTodos() {
    window.localStorage.setItem(TODOS_ID, JSON.stringify(todos));
}

function addTodo(todo) {
    todos.push(todo);
    writeTodos();
    return todo;
}

function removeTodo(index) {
    todos.splice(index, 1);
    writeTodos();
}

function updateTodo(index, todo) {
    todos[index].completed = todo.completed;
    todos[index].value = todo.value;
    writeTodos();
}

function indexOf(array, element) {
    for(var i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return i;
        }
    }
    return -1;
}

////////////////////////////////////////////////// VIEW TODOS //////////////////////////////////////////////////
function createViewTodos() {
    for(var i = 0; i < todos.length; i++) {
        addElementTodo(todos[i]);
    }

    updateCounter();
    updateFilterView();
    updateFilter();
    updateClearCompleted();
}

function updateViewTodos() {
    
    for(var i = 0; i < todos.length; i++) {
        updateElementTodo(i);
    }

}

function updateElementTodo(index) {
    var checkbox = elements.list.children[index].querySelector('.todos__listitem input[type="checkbox"]');
    checkbox.checked = todos[index].completed;
}

////////////////////////////////////////////////// ADD todos element //////////////////////////////////////////////////
function onNewTodoKeyDown(event) {
    if (KEY_CODE_ENTER === event.keyCode) {

        var valueNewTodo = elements.newTodo.value;
        var todo = addTodo({completed: false, value: valueNewTodo});
        addElementTodo(todo);

        elements.newTodo.value = '';
        updateCounter();
        updateFilter();
    }
}

function addElementTodo(todo) {    
    var listItem = document.createElement('li');

    var html = [
        '<div class="todos__listitem">',
        '  <input type="checkbox">',
        '  <label>' + todo.value + '</label>',
        '  <input type="button" value="×">',
        '</div>'
    ].join('');

    listItem.innerHTML = html;
    elements.list.appendChild(listItem);

    var remove = listItem.querySelector('.todos__listitem input[type="button"]');
    remove.addEventListener('click', onRemoveListItemClick);
    var checkboxItem = listItem.querySelector('.todos__listitem input[type="checkbox"]');
    checkboxItem.checked = todo.completed;
    checkboxItem.addEventListener('change', onCheckboxItemChange);
}

////////////////////////////////////////////////// REMOVE todos element //////////////////////////////////////////////////
function onRemoveListItemClick(event) {

    var indexElement = indexOf(elements.list.children, event.target.parentNode.parentNode);
    removeTodo(indexElement);

    // TODO: !!!!!!!!!!!!!!
    removeElementTodo(indexElement);
    updateCounter();
    updateClearCompleted();
}

function removeElementTodo(index) {
    elements.list.removeChild(elements.list.children[index]);
}

////////////////////////////////////////////////// click todo's checkbox
function onCheckboxItemChange(event) {
    var indexElement = indexOf(elements.list.children, event.target.parentNode.parentNode);
    updateTodo(indexElement, {value: todos[indexElement].value, completed: event.target.checked});

    updateCounter();
    updateFilter();
    updateClearCompleted();
}

////////////////////////////////////////////////// SELECT ALL //////////////////////////////////////////////////
function onSelectAllChange(event) {
    
    for (var i = 0; i < todos.length; i++) {
        todos[i].completed = elements.selectAll.checked;
    }
    writeTodos();

    updateViewTodos();
    updateCounter();
    updateFilter();
    updateClearCompleted();
}

////////////////////////////////////////////////// COUNTER
function updateCounter() {
    // TODO: !!!!!!!!!!!!!!
    
    var array = todos.filter(function(item, index, array) {
        return !(item.completed);
    });

    elements.counter.innerHTML = (array.length <= 1) ? array.length + ' item left' : array.length + ' items left';
}

////////////////////////////////////////////////// FILTER
function readFilter() {
    var filter = window.localStorage.getItem(TODOS_FILTER_ID);
    return JSON.parse(filter) || FILTER_ALL;
}

function writeFilter() {
    window.localStorage.setItem(TODOS_FILTER_ID, JSON.stringify(currentFilter));
}

function onFilterClick(event) { 
    currentFilter = Number(event.target.dataset.filter);
    removeFilter();
    event.target.classList.add('selected');
    updateFilter();

    writeFilter();
}

function removeFilter() {
    elements.filter1.classList.remove('selected');
    elements.filter2.classList.remove('selected');
    elements.filter3.classList.remove('selected');
}

function updateFilterView() {
    removeFilter();
    if (currentFilter === FILTER_ALL) {
        elements.filter1.classList.add('selected');    
    } else if (currentFilter ===  FILTER_ACTIVE) {
        elements.filter2.classList.add('selected');
    } else if (currentFilter === FILTER_COMPLETED) {    
        elements.filter3.classList.add('selected');
    }
}

function updateFilter() {
    for (var i = 0; i < todos.length; i++) {
        elements.list.children[i].classList.remove('hidden');
    
        if (currentFilter === FILTER_ALL) {
        
        } else if (currentFilter ===  FILTER_ACTIVE) {
            // TODO: !!!!!!!!!!!!!!
            if (todos[i].completed) {
                elements.list.children[i].classList.add('hidden');
            }
        } else if (currentFilter === FILTER_COMPLETED) {    
            // TODO: !!!!!!!!!!!!!!
            if (!(todos[i].completed)) {
                elements.list.children[i].classList.add('hidden');
            }
        }
    }
}

////////////////////////////////////////////////// CLEAR COMPLETED
function updateClearCompleted() {
    // TODO: !!!!!!!!!!!!!!
    var array = todos.filter(function(item, index, array) {
        return item.completed;
    })
    
    elements.clearCompleted.classList.remove('visible');
    if (array.length) {
        elements.clearCompleted.classList.add('visible');
    }   
}

function onClearCompletedClick(event) {
    // TODO: !!!!!!!!!!!!!!
    var arrayCompleted = [];

    todos = todos.filter(function(item, i, array) {
        if (item.completed) {
            arrayCompleted.unshift(i);
        }
        return !item.completed;
    })
    
    writeTodos();

    for(var i = 0; i < arrayCompleted.length; i++) {
        elements.list.removeChild(elements.list.children[arrayCompleted[i]]);
    }

    elements.selectAll.checked = false;
    updateClearCompleted();
}


/// дописать обновление элемента в базе(галочки)
/// дописать отображение зачеркнутых элементов
/// дописать сохранение фильтра в базу