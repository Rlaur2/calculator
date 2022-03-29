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