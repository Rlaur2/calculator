//the four basic functions for the operators
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

//the function that evaluates the expression and returns the answer
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

//DOM manipulation variables
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
    //'operand' class distinguishes user-inputted numbers from numbers that were evaluated results
    //after inputting a single number, operand class is removed
    if (mainDisplay.className.includes('operand')) {
        mainDisplay.textContent = '';
        mainDisplay.classList.remove('operand');
    }
    //code to disable numbers when inputted length is too long
    if (mainDisplay.textContent.length > 12) {
        for (numberButton of numberButtons) {
            numberButton.removeEventListener('click',displayNumber);
        }
    }
    //keypad's text is used fill out the main display
    mainDisplay.textContent += this.textContent;
    operand = mainDisplay.textContent;
}

//loop to add event listener to buttons 0-9
for (numberButton of numberButtons){
    numberButton.addEventListener('click',displayNumber);
}

//code that controls the four operators
let operatorPlug = ''
let equation = [];
function operation(e) {
    //if statement to catch unique situations when clicking on operators with an operator already chosen 
    if (equation.length === 1 && Number(operand) === equation[0] && !mainDisplay.className.includes('operand')) {
        solution();
    } //else if to suppliment the above 
    else if (equation.length === 1 && operand != equation[0]) {
        solution();
    } //code based of clicked button to decide which operator function to be used 
    if (this.id === 'division') {
        operatorPlug = '/';       
    } if (this.id === 'multiplication') {
        operatorPlug = '*';
    } if (this.id === 'minus') {
        operatorPlug = '-';
    } if (this.id === 'addition') {
        operatorPlug = '+';
    } //operators only push when array is empty 
    if (equation.length === 0) {
        equation.push(Number(operand));
    }
    //code to indicate number in display is not user-inputted anymore 
    mainDisplay.classList.add('operand');
    //Code to re-enable keypad in case user inputted max length number
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    }
};

//Code that uses current number in display to evaluate along with previously entered number
//also clears and resets certain things
let answer = ''
const solution = () => {
    equation.push(Number(operand));
    answer = operate(equation[0],operatorPlug,equation[1]);
    equation = [];
    operatorPlug = '';
    operand = answer;
    mainDisplay.textContent = answer;
    mainDisplay.classList.add('operand');
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    }
}

//function to clear out the calculator of all info
const reset = () => {
    equation = [];
    mainDisplay.textContent = '';
    operatorPlug = '';
    operand = '';
    mainDisplay.classList.remove('operand');
    for (numberButton of numberButtons){
        numberButton.addEventListener('click',displayNumber);
    };
};

divideButton.addEventListener('click',operation);
multiplyButton.addEventListener('click',operation);
minusButton.addEventListener('click',operation);
additionButton.addEventListener('click',operation);
equalButton.addEventListener('click',solution);
clearButton.addEventListener('click',reset);