const add = (a,b) => {
    return a + b;
};

const subtract = (a,b) => {
    return a - b;
};

const multiply = (a,b) => {
    return a * b;
};

const divide = (a,b) => {
    if (b === 0) {
        let random = Math.floor(Math.random()*5)
        if (random === 0) {
            return 'Undefined';
        } if (random === 1) {
            return 'I can\'t define that'
        } if (random === 2) {
            return 'No'
        } if (random === 3) {
            return 'I\'m afraid I can\'t do that, Dave'
        } if (random === 4) {
            return 'Indéfini'
        }    
    };
    return a / b;
};

const operate = (number1, operator, number2) => {
    if (operator === '+') {
        return add(number1,number2);
    } if (operator === '-') {
        return subtract(number1,number2);
    } if (operator === '*') {
        return multiply(number1,number2);
    } if (operator === '/') {
        return divide(number1,number2);
    }
}

const numberButtons = document.querySelectorAll('.number');
const mainDisplay = document.querySelector('.main-display');
const miniDisplay = document.querySelector('.mini-display');
const clearButton = document.querySelector('.clear-button');
const dotButton = document.querySelector('.dot');
const backSpace = document.querySelector('.back');
const divideButton = document.querySelector('#division');
const multiplyButton = document.querySelector('#multiplication');
const minusButton = document.querySelector('#minus');
const additionButton = document.querySelector('#addition');
const equalButton = document.querySelector('#equal');


//function to display clicked numbers and save to variable
let operand = '';
function displayNumber(e) {
    if (mainDisplay.className.includes('operand')) {
        mainDisplay.textContent = '';
        mainDisplay.classList.remove('operand');
    }
    if (mainDisplay.textContent.length > 8) {
        for (numberButton of numberButtons) {
            numberButton.removeEventListener('click',displayNumber);
        }
    }
    mainDisplay.textContent += this.textContent;
    operand = mainDisplay.textContent;
}

//loop to add event listener to buttons 0-9
for (numberButton of numberButtons){
    numberButton.addEventListener('click',displayNumber);
}

let operatorPlug = ''
let equation = [];

function operation(e) {
    //beginnings of codeto fix clicking on operator multiple times 
    /*if (equation.length === 1) {

    }*/
    if (this.id === 'division') {
        operatorPlug = '/';       
    } if (this.id === 'multiplication') {
        operatorPlug = '*';
    } if (this.id === 'minus') {
        operatorPlug = '-';
    } if (this.id === 'addition') {
        operatorPlug = '+';
    }
    equation.push(Number(operand));
    mainDisplay.classList.add('operand');
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    }
};

let answer = ''
const solution = () => {
   //code meant to fix situation of hitting enter without enough operands
    /* if (equation.length < 1) {
        return;
    } */
    equation.push(Number(operand));
    answer = operate(equation[0],operatorPlug,equation[1]);
    equation = [];
    equation.push(answer);
    mainDisplay.textContent = answer;
    mainDisplay.classList.add('operand');
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    }
}


divideButton.addEventListener('click',operation);
multiplyButton.addEventListener('click',operation);
minusButton.addEventListener('click',operation);
additionButton.addEventListener('click',operation);
equalButton.addEventListener('click',solution);