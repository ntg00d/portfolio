const input = document.querySelector('.todo__input')
const btn = document.querySelector('.todo__btn')
const result = document.querySelector('.todo__result')
const total = document.querySelector('.todo__total')

total.textContent = 0 // Счётчик задач

function createDeleteElements(value) {
    total.textContent++
    const li = document.createElement('li')
    const deleteBtn = document.createElement('button')

    li.className = 'todo__li'
    li.textContent = value

    deleteBtn.className = 'todo__btn-del'
    deleteBtn.textContent = '×'
    li.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', () => {
        result.removeChild(li)
        total.textContent--
    }) // Remove

    li.addEventListener('click', () => {
        li.classList.toggle('todo__li-active')
    }) // Toggle

    result.appendChild(li)
}

btn.addEventListener('click', () => {
    if (input.value === '') {
        return null
    } else createDeleteElements(input.value)
    input.value = ''
})