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
        //disables calculator until user clicks on clear
        mainDisplay.classList.add('cant-work');
        mainDisplay.classList.add('many-numbers');
        disableButtons();
        if (random === 0) {
            mainDisplay.textContent = 'Undefined';
            return;
        } if (random === 1) {
            mainDisplay.textContent = 'I can\'t define that';
            return;
        } if (random === 2) {
            mainDisplay.textContent = 'No';
            return;
        } if (random === 3) {
            //long string needs unique class to display properly
            mainDisplay.classList.add('hal9000');
            mainDisplay.textContent ='I\'m afraid I can\'t do that, Dave';
            return;
        } if (random === 4) {
            mainDisplay.textContent = 'Indéfini';
            return;
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
    //code to make font-size normal after being reduced
    mainDisplay.classList.remove('many-numbers');
    //code to disable numbers when inputted length is too long
    if (mainDisplay.textContent.length > 12) {
        for (numberButton of numberButtons) {
            numberButton.removeEventListener('click',displayNumber);
        }
    }
    //keypad button's text is used fill out the main display
    mainDisplay.textContent += this.textContent;
    //updates the operand on every click
    operand = mainDisplay.textContent;
}



//function to display the decimal and not allow mutliple decimals to be inputted
const dot = () => {
    if (mainDisplay.textContent.includes('.') && !mainDisplay.className.includes('operand')) {
        return;
    }//'operand' class distinguishes user-inputted numbers from numbers that were evaluated results
    //after inputting a single number, operand class is removed
    if (mainDisplay.className.includes('operand')) {
        mainDisplay.textContent = '';
        mainDisplay.classList.remove('operand');
    }
    //code to make font-size normal after being reduced
    mainDisplay.classList.remove('many-numbers');
    //code to disable numbers when inputted length is too long
    if (mainDisplay.textContent.length > 12) {
        for (numberButton of numberButtons) {
            numberButton.removeEventListener('click',displayNumber);
        }
    }
    //keypad's text is used fill out the main display
    mainDisplay.textContent += '.';
    //updating operand when clicking on decimal not necessary as it doesn't change the actual number until
    //another number is added after the decimal
}

//function to delete last number
const back = () => {
     //'operand' class distinguishes user-inputted numbers from numbers that were evaluated results
    //after inputting a single number, operand class is removed
    mainDisplay.classList.remove('operand');
    mainDisplay.textContent = mainDisplay.textContent.slice(0,mainDisplay.textContent.length-1);
    //saves new number displayed as the operand unless the display is empty
    if (mainDisplay.textContent.length > 0){
        operand = mainDisplay.textContent; 
    } else {
        operand = '';
    }
    //if statement to catch lone negative symbols 
    if (mainDisplay.textContent === '-') {
        mainDisplay.textContent = '';
        operand = '';
    }
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
    } //code based off clicked button to decide which operator function to be used 
    if (this.id === 'division') {
        operatorPlug = '/';
        //CSS rules to keep hover color for active operator
        //currently disabled
        /*divideButton.classList.add('clicked-on');
        multiplyButton.classList.remove('clicked-on');
        minusButton.classList.remove('clicked-on');
        additionButton.classList.remove('clicked-on');*/ 
    } if (this.id === 'multiplication') {
        operatorPlug = '*';
        /*multiplyButton.classList.add('clicked-on');
        divideButton.classList.remove('clicked-on');
        minusButton.classList.remove('clicked-on');
        additionButton.classList.remove('clicked-on');*/
    } if (this.id === 'minus') {
        operatorPlug = '-';
        /*minusButton.classList.add('clicked-on');
        multiplyButton.classList.remove('clicked-on');
        divideButton.classList.remove('clicked-on');
        additionButton.classList.remove('clicked-on');*/
    } if (this.id === 'addition') {
        operatorPlug = '+';
        /*additionButton.classList.add('clicked-on');
        minusButton.classList.remove('clicked-on');
        multiplyButton.classList.remove('clicked-on');
        divideButton.classList.remove('clicked-on');*/
    } if (equation.length > 0) {
        updateDisplay();
    } //operators only push when array is empty and the main display isn't empty
    if (equation.length === 0 && mainDisplay.textContent != '') {
        equation.push(Number(operand));
        updateDisplay();
    } //class to indicate number in display is not user-inputted anymore 
    mainDisplay.classList.add('operand');
    //Code to re-enable keypad in case user inputted max length number
    //unless a string is in the display
    if (!mainDisplay.className.includes('cant-work')) {
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    }
    dotButton.addEventListener('click',dot);
}
};

//Code that uses current number in display to evaluate along with previously entered number
//also clears and resets certain things
let answer = ''
const solution = () => {
    //if statement that resets calculator if no operand present
    if (equation.length === 0) {
        reset();
        return;
    } 
    equation.push(Number(operand));
    updateDisplay();
    answer = operate(equation[0],operatorPlug,equation[1]);
    answer = Number(answer.toFixed(3));
    equation = [];
    operatorPlug = '';
    operand = answer;
    mainDisplay.textContent = answer;
    mainDisplay.classList.add('operand');
    //enables keypad if disabled earlier
    for (numberButton of numberButtons) {
        numberButton.addEventListener('click',displayNumber);
    } 
    dotButton.addEventListener('click',dot);
    //displays E when number gets too large, must clear calculator
    if (mainDisplay.textContent.length > 21) {
        mainDisplay.textContent = 'E';
        mainDisplay.classList.add('cant-work');
        disableButtons();
    } //reduces font-size when number gets too large
    if (mainDisplay.textContent.length > 14) {
        mainDisplay.classList.add('many-numbers');
    } 
}

//function to add keyboard support
const keyPress = (e) => {
    if(e.key === '.') {
        dot();
    } if (e.key ==='Enter' || e.key === '=') {
        solution();
    } if (e.key === 'Backspace') {
        back();
    } if (e.key === '/') {
        this.id = 'division';
        operation();
    } if (e.key === '*') {
        this.id = 'multiplication';
        operation();
    } if (e.key === '-') {
        this.id = 'minus';
        operation();
    } if (e.key === '+') {
        this.id = 'addition';
        operation();
    } if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' ||
        e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
            if (mainDisplay.className.includes('operand')) {
                mainDisplay.textContent = '';
                mainDisplay.classList.remove('operand');
            }
            if (mainDisplay.textContent.length < 14) {
            numberPress(e.key);
        }
    } 
};

//function to clear out the calculator of all info
const reset = () => {
    equation = [];
    mainDisplay.textContent = '';
    operatorPlug = '';
    operand = '';
    mainDisplay.classList.remove('operand');
    mainDisplay.classList.remove('cant-work');
    mainDisplay.classList.remove('hal9000');
    enableButtons();
    miniDisplay.textContent = '';
    additionButton.classList.remove('clicked-on');
    minusButton.classList.remove('clicked-on');
    multiplyButton.classList.remove('clicked-on');
    divideButton.classList.remove('clicked-on');

};

const enableButtons = () => {
    divideButton.addEventListener('click',operation);
    multiplyButton.addEventListener('click',operation);
    minusButton.addEventListener('click',operation);
    additionButton.addEventListener('click',operation);
    equalButton.addEventListener('click',solution);
    for (numberButton of numberButtons){
        numberButton.addEventListener('click',displayNumber);
    };
    dotButton.addEventListener('click',dot);
    backSpace.addEventListener('click',back);
    document.addEventListener('keydown', keyPress);
}

const disableButtons = () => {
    divideButton.removeEventListener('click',operation);
    multiplyButton.removeEventListener('click',operation);
    minusButton.removeEventListener('click',operation);
    additionButton.removeEventListener('click',operation);
    equalButton.removeEventListener('click',solution);
    for (numberButton of numberButtons){
        numberButton.removeEventListener('click',displayNumber);
    };
    dotButton.removeEventListener('click',dot);
    backSpace.removeEventListener('click',back);
    document.removeEventListener('keydown',keyPress);
    miniDisplay.textContent = 'MUST CLEAR';
}

//code to display the current equation in the mini display
const updateDisplay = () => {
    let symbol = '';
    if (operatorPlug === '/') {
        symbol = '÷';
    } else if (operatorPlug === '*') {
        symbol = 'x';
    } else {
        symbol = operatorPlug;
    } 
    if (equation[1] === undefined) {
        miniDisplay.textContent = `${equation[0]} ${symbol}`;
    } else {
        miniDisplay.textContent = `${equation[0]} ${symbol} ${equation[1]}`;
    };
}


//loop to add event listener to buttons 0-9
for (numberButton of numberButtons){
    numberButton.addEventListener('click',displayNumber);
}//event listeners for clicking
dotButton.addEventListener('click',dot);
backSpace.addEventListener('click',back);
divideButton.addEventListener('click',operation);
multiplyButton.addEventListener('click',operation);
minusButton.addEventListener('click',operation);
additionButton.addEventListener('click',operation);
equalButton.addEventListener('click',solution);
clearButton.addEventListener('click',reset);

//event listener for keydown presses
document.addEventListener('keydown',keyPress);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        reset();
}});
//function specifically for numbers on the keyboard
const numberPress = (number) => {
    //'operand' class distinguishes user-inputted numbers from numbers that were evaluated results
    //after inputting a single number, operand class is removed
    if (mainDisplay.className.includes('operand')) {
        mainDisplay.textContent = '';
        mainDisplay.classList.remove('operand');
    }
    //code to make font-size normal after being reduced
    mainDisplay.classList.remove('many-numbers');
    //code to disable numbers when inputted length is too long
    if (mainDisplay.textContent.length > 12) {
        for (numberButton of numberButtons) {
            numberButton.removeEventListener('click',displayNumber);
        } 
    }
    mainDisplay.textContent += number;
    //updates the operand on every click
    operand = mainDisplay.textContent;
}