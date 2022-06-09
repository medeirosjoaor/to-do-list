const ul = document.querySelector('ul');

if (localStorage.getItem('index') === null) localStorage.setItem('index', 0);
if (sessionStorage.getItem('size') === null) sessionStorage.setItem('size', 'medium');

function persistTasks() {
  const keys = Object.keys(localStorage);
  const index = keys.indexOf('index');
  keys.splice(index, 1);
  keys.sort();

  keys.forEach((element) => {
    const template = document.createElement('template');
    template.innerHTML = localStorage.getItem(element);
    ul.appendChild(template.content);
  });
}

function persistFontSize() {
  const size = sessionStorage.getItem('size');

  if (size !== 'medium') {
    document.getElementById('medium').classList.remove('chosen');
    document.getElementById(size).classList.add('chosen');
  }
}

function setSize() { return document.querySelector('.chosen').id; }

function addTaskToTodoList() {
  const input = document.getElementById('input');
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const { value } = input;
      input.value = '';

      if (value !== '') {
        const li = document.createElement('li');
        li.innerHTML = value;
        li.classList.add(setSize());
        ul.appendChild(li);
      }
    }
  });
}

function selectTask() {
  ul.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') {
      if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected');
      }

      e.target.classList.add('selected');
    }
  });
}

function completeOrUncompleteTask() {
  ul.addEventListener('dblclick', (e) => {
    if (e.target.nodeName === 'LI') {
      if (e.target.classList.contains('completed')) {
        e.target.classList.remove('completed');
      } else {
        e.target.classList.add('completed');
      }
    }
  });
}

function changeFontToSmall() {
  const button = document.getElementById('small');
  button.addEventListener('click', () => {
    let li = document.getElementsByTagName('li');
    document.querySelector('.chosen').classList.remove('chosen');
    button.classList.add('chosen');
    li = Array.from(li);

    li.forEach((element) => {
      if (element.classList.contains('medium')) element.classList.remove('medium');
      if (element.classList.contains('large')) element.classList.remove('large');

      element.classList.add('small');
    });

    sessionStorage.setItem('size', 'small');
  });
}

function changeFontToMedium() {
  const button = document.getElementById('medium');
  button.addEventListener('click', () => {
    let li = document.getElementsByTagName('li');
    document.querySelector('.chosen').classList.remove('chosen');
    button.classList.add('chosen');
    li = Array.from(li);

    li.forEach((element) => {
      if (element.classList.contains('small')) element.classList.remove('small');
      if (element.classList.contains('large')) element.classList.remove('large');

      element.classList.add('medium');
    });

    sessionStorage.setItem('size', 'medium');
  });
}

function changeFontToLarge() {
  const button = document.getElementById('large');
  button.addEventListener('click', () => {
    let li = document.getElementsByTagName('li');
    document.querySelector('.chosen').classList.remove('chosen');
    button.classList.add('chosen');
    li = Array.from(li);

    li.forEach((element) => {
      if (element.classList.contains('small')) element.classList.remove('small');
      if (element.classList.contains('medium')) element.classList.remove('medium');

      element.classList.add('large');
    });

    sessionStorage.setItem('size', 'large');
  });
}

function moveTaskDown() {
  const button = document.getElementById('down');
  button.addEventListener('click', () => {
    const task = document.querySelector('.selected');

    if (task !== null && task !== ul.lastChild) task.replaceWith(task.nextSibling, task);
  });
}

function moveTaskUp() {
  const button = document.getElementById('up');
  button.addEventListener('click', () => {
    const task = document.querySelector('.selected');

    if (task !== null && task !== ul.firstChild) task.replaceWith(task, task.previousSibling);
  });
}

function removeFromlocalStorage(string) {
  const keys = Object.keys(localStorage);

  keys.forEach((element) => {
    if (localStorage[element].includes(string)) localStorage.removeItem(element);
  });
}

function deleteSelectedTask() {
  const button = document.getElementById('cross');
  button.addEventListener('click', () => {
    const task = document.querySelector('.selected');

    if (task !== null) {
      task.remove();
      removeFromlocalStorage('selected');
    }
  });
}

function deleteCompletedTasks() {
  const button = document.getElementById('delete');
  button.addEventListener('click', () => {
    let li = document.getElementsByTagName('li');
    li = Array.from(li);

    li.forEach((element) => {
      if (element.classList.contains('completed')) element.remove();
      removeFromlocalStorage('completed');
    });
  });
}

function deleteAllTasks() {
  const button = document.getElementById('trash');
  button.addEventListener('click', () => {
    let li = document.getElementsByTagName('li');
    li = Array.from(li);

    li.forEach((element) => {
      element.remove();
    });

    const index = localStorage.getItem('index');
    localStorage.clear();
    localStorage.setItem('index', index);
  });
}

function format(li) {
  return `<li class="${li.classList}">${li.innerHTML}</li>`;
}

function saveAllTasks() {
  const button = document.getElementById('bookmark');
  button.addEventListener('click', () => {
    let index = localStorage.getItem('index');
    let li = document.getElementsByTagName('li');
    localStorage.clear();
    localStorage.setItem('index', index);
    li = Array.from(li);

    li.forEach((element) => {
      localStorage.setItem(index, format(element));
      index = parseInt(index, 10);
      index += 1;
      localStorage.setItem('index', index);
    });
  });
}

persistTasks();
persistFontSize();
addTaskToTodoList();
selectTask();
completeOrUncompleteTask();
changeFontToSmall();
changeFontToMedium();
changeFontToLarge();
moveTaskDown();
moveTaskUp();
deleteSelectedTask();
deleteCompletedTasks();
deleteAllTasks();
saveAllTasks();
