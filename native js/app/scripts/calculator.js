// DOM
const previousOperand = document.querySelector('.previous-operand')
const currentOperand = document.querySelector('.current-operand')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')

// Начальные значения
previousOperand.innerText = ''
currentOperand.innerText = 0
let tumbler // После вычисления при попытке сделать следующую операцию новые числа в текущем операнде конкатенируются со старыми, тумблер убирает этот дефект. При событии чисел данной переменной присваивается "0", при событии сравнения - "1"

// Функции
function calculation(previous, current) {
    let exp = previous + current
    return new Function('return ' + exp.replace(/[^-()\d/*+.]/g, ''))()
}
function operation(operator) {
    if (previousOperand.innerText.search(/[+-/*]/g) && currentOperand.innerText == '') {
        previousOperand.innerText = previousOperand.innerText.slice(0, -1) + operator
        // Возможность смены оператора при повторном нажатии
    }
    if (previousOperand.innerText && currentOperand.innerText != '') {
        previousOperand.innerText = calculation(previousOperand.innerText, currentOperand.innerText) + operator
        currentOperand.innerText = '' // Автоматическое вычисление при последовательности операторов в выражении
    }
    if (currentOperand.innerText != '') {
        previousOperand.innerText = currentOperand.innerText + operator
        currentOperand.innerText = ''
    }
}
function equals() {
    if ((previousOperand.innerText && currentOperand.innerText) != '') {
        if (previousOperand.innerText.slice(-1) == '/' && currentOperand.innerText == 0) {
            previousOperand.innerText = ''
            currentOperand.style.fontSize = '1.5rem' // Для нормального отображения строки
            currentOperand.innerText = 'Деление на ноль невозможно'
            tumbler = 1
        } else {
            currentOperand.innerText = calculation(previousOperand.innerText, currentOperand.innerText)
            previousOperand.innerText = ''
            tumbler = 1
        }
    }
}
function allClear() {
    previousOperand.innerText = ''
    currentOperand.innerText = 0
}
function del() {
    currentOperand.innerText = currentOperand.innerText.slice(0, -1)
    if (currentOperand.innerText == '') {
        currentOperand.innerText = 0
    }
}

// События
numberButtons.forEach(element => {
    element.addEventListener('click', numEvent => {
        if (tumbler == 1) {
            currentOperand.style.fontSize = '2.5rem' // Возвращение к исходному значению
            currentOperand.innerText = ''
            tumbler = 0
        }
        if (currentOperand.innerText == 0) {
            currentOperand.innerText = ''
        }
        currentOperand.innerText = currentOperand.innerText + numEvent.target.innerText
    })
})
operationButtons.forEach(element => {
    element.addEventListener('click', operEvent => {
        operation(operEvent.target.innerText)
    })
})
equalsButton.addEventListener('click', equals)
allClearButton.addEventListener('click', allClear)
deleteButton.addEventListener('click', del)