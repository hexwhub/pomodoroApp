const lists = document.querySelector('.lists');
const todoValue = document.querySelector('.todo_input');
const todoAddBTN = document.querySelector('.todoAdd');
const compTodo = document.querySelector('.compTodo');

    let complatedTodo = 0;

function addTodo() {

    const todoValueInput = todoValue.value.trim();
    if (!todoValueInput) {
        alert("Lütfen bir görev giriniz.")
    }

    const li = document.createElement('li');
    li.innerHTML = `
    ${todoValueInput}
    <button class="tick">✅</button>
`;
    const tick = li.querySelector('.tick')
    const delButton = document.createElement('button');
    delButton.textContent = "Sil"

    lists.appendChild(li);

    li.append(delButton);
    todoValue.value = '';

    function delTodo() {
        li.remove();
    }



    function complatedTodos() {
        complatedTodo++;
        compTodo.textContent = `Done Todos : ${complatedTodo}`
        li.remove();
    };


    tick.addEventListener('click', complatedTodos)
    delButton.addEventListener('click', delTodo);
}


todoAddBTN.addEventListener('click', addTodo)


todoValue.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
})