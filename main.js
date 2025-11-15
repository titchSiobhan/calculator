
const screen = document.querySelector('.screen');
const screenDigits = document.createElement('div');
screenDigits.setAttribute('class', 'screenDigits');
screen.appendChild(screenDigits);
const equals = document.querySelector('.equals');
equals.addEventListener('click', calculate);


let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let isSecondNumber = false;
let justCalculated = false;
let isError = false;



function add(firstNumber, secondNumber) {
return firstNumber + secondNumber;
}


function subtract(firstNumber, secondNumber) {
    
return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    if (secondNumber === 0) {
        isError = true;
        return 'no'
    } else {
return firstNumber / secondNumber;
    }
}


let numButtons = document.querySelectorAll('.numbtn');
let opButtons = document.querySelectorAll('.opbtn')



const clear = document.querySelector('.clear');
function clearScreen() {
      screenDigits.textContent = '';
  firstNumber = '';
  secondNumber = '';
  operator = '';
  result = '';
  isSecondNumber = false;
  justCalculated = false;
  isError = false;
}
clear.addEventListener('click', clearScreen)


function operate(firstNumber, operator, secondNumber) {
   
    switch (operator) {
                 case "+": 
                  return add(firstNumber, secondNumber); 
                break;
                  case '-': 
                  return subtract(firstNumber, secondNumber); 
                break;
                  case '*': 
                return  multiply(firstNumber, secondNumber); 
               break;
                  case '/': 
                return divide(firstNumber, secondNumber); 
                 break;
                 
                default:
                    return null;
    }
}

 
opButtons.forEach((opButton) => {
  opButton.addEventListener('click', handleOperator)
});


numButtons.forEach((numButton) => {
    numButton.addEventListener('click', updateDisplay)
})

//if theres a error
if (isError) {
    clearScreen()
    isError = false

}
function updateDisplay(event) {
    let clickedButton = event.target;
    let clickedValue = clickedButton.getAttribute('value')
    if (clickedValue === "."){
        if(!isSecondNumber){
            if (firstNumber.includes(".")){
                return
            }
        } else if (secondNumber.includes(".")){
            return
        }
}



    
if (justCalculated){
    if(!operator){
        firstNumber = '';
    }
    secondNumber = '';
    isSecondNumber = false;
    justCalculated = false;
    screenDigits.textContent = '';
}

 if(!isSecondNumber){
        if(firstNumber.length >= 8){
            return
        }
        firstNumber += clickedValue
    } else {
        if(secondNumber.length >= 8){
            return
        }
        secondNumber += clickedValue
    }
    screenDigits.textContent += clickedValue;
}

function printScreen(button) {
  const value = button.getAttribute('value') || button.value;
  screenDigits.textContent += value;
}


function handleOperator(event) {

    if (isError) {
        return
    }


if (isSecondNumber) {
    calculate()
}
if (firstNumber === '') {
    return
}

if(justCalculated) {
    screenDigits.textContent = firstNumber
    justCalculated = false;
}

isSecondNumber = true
let clickedButton  = event.target
operator = clickedButton.getAttribute('value')

screenDigits.textContent = `${operator}`
}

function calculate() {
    let num1 = parseInt(firstNumber);
    let num2 = parseInt(secondNumber);

    if( isError) {
        return
    }

    if(secondNumber === ''){
        result = firstNumber
    } else {
        result = operate(num1, operator, num2)
    }

    if(firstNumber === '' && operator === '' && secondNumber === '') {
        screenDigits.textContent = 0;
    return
    }

    result = result.toString();
if (result.length >= 8) {
  result = result.slice(0, 8) + '...';
}


    justCalculated = true;
    
    screenDigits.textContent = result;
    firstNumber = result;
    secondNumber = '';
    operator = '';
    isSecondNumber = false;
}
