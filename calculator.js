const currentNumber = document.querySelector(".current-number");
const lastNumber = document.querySelector(".last-number");
const operators = ["+", "-", "x", "/", "="];
let operationToPerform = "";

//adding numbers to currentNumber
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (elem.textContent === ".") addDecimal(currentNumber);
  if (elem.textContent === "(-)" && currentNumber.textContent !== "")
    toggleNegative(currentNumber);
  if (elem.textContent === "0" && zeroCheck(currentNumber)) return;
  if (!isNaN(elem.textContent)) {
    if (zeroCheck(currentNumber)) currentNumber.textContent = "";
    currentNumber.textContent += elem.textContent;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === ".") addDecimal(currentNumber);
  if (e.key === "0" && zeroCheck(currentNumber)) return;
  if (!isNaN(e.key)) {
    if (zeroCheck(currentNumber)) currentNumber.textContent = "";
    currentNumber.textContent += e.key;
  }
});

//make sure there isn't more than one zero at the beginning of current number
function zeroCheck(element) {
  if (element.textContent === "0" && element.textContent.length >= 1)
    return true;
}

//decimal support
function decimalCheck(element) {
  if (element.textContent.includes(".")) return true;
}

function addDecimal(element) {
  if (decimalCheck(currentNumber)) return;
  else if (element.textContent === "0" || element.textContent === "")
    element.textContent = "0.";
  else if (element.textContent === "-") element.textContent = "-0.";
  else element.textContent += ".";
}

//negative numbers
function isNegative(element) {
  return element.textContent.includes("-");
}

function toggleNegative(element) {
  if (!isNegative(currentNumber))
    element.textContent = "-" + element.textContent;
  else element.textContent = element.textContent.slice(1);
}

//All Clear
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (elem.textContent === "AC") {
    currentNumber.textContent = "";
    lastNumber.textContent = "";
    operationToPerform = "";
  }
});

//Clear
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (elem.textContent === "C") {
    currentNumber.textContent = "";
  }
});

//Delete
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (elem.textContent === "DEL") {
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  }
});

//update display
function updateDisplay() {
  if (currentNumber.textContent !== "") {
    lastNumber.textContent = parseFloat(currentNumber.textContent);
    currentNumber.textContent = "";
  }
}

//base math functions
function add(first, second) {
  let num1 = Number(first);
  let num2 = Number(second);
  lastNumber.textContent = num1 + num2;
  currentNumber.textContent = "";
}

function subtract(first, second) {
  let num1 = Number(first);
  let num2 = Number(second);
  lastNumber.textContent = num1 - num2;
  currentNumber.textContent = "";
}

function multiply(first, second) {
  let num1 = Number(first);
  let num2 = Number(second);
  lastNumber.textContent = num1 * num2;
  currentNumber.textContent = "";
}

function divide(first, second) {
  let num1 = Number(first);
  let num2 = Number(second);
  lastNumber.textContent = num1 / num2;
  currentNumber.textContent = "";
}

//operations proper (click and mousedown)
document.addEventListener("click", (e) => {
  performOperations(e);
});

document.addEventListener("keydown", (e) => {
  performOperations(e);
});

//this allows for both click and keyboard functionality
function captureElem(e) {
  let elem = e.key;
  if (!elem) elem = e.target.textContent;
  return elem;
}

//equals cancels out the operation to perform
document.addEventListener("click", (e) => {
  if (e.target.textContent === "=") {
    evaluateExpression();
    operationToPerform = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "=") {
    evaluateExpression();
    operationToPerform = "";
  }
});

function evaluateExpression() {
  if (currentNumber.textContent === "") return;
  else {
    if (operationToPerform === "") updateDisplay();
    if (operationToPerform === "+")
      add(lastNumber.textContent, currentNumber.textContent);
    else if (operationToPerform === "-")
      subtract(lastNumber.textContent, currentNumber.textContent);
    else if (operationToPerform === "x") {
      multiply(lastNumber.textContent, currentNumber.textContent);
      tooManyDecimalsCheck();
    } else if (operationToPerform === "/") {
      if (parseFloat(currentNumber.textContent) === 0) dontDivideByZero();
      else {
        divide(lastNumber.textContent, currentNumber.textContent);
        tooManyDecimalsCheck();
      }
    }
  }
}

function tooManyDecimalsCheck() {
  if ((lastNumber.textContent * 10000) % 1 !== 0) {
    lastNumber.textContent = parseFloat(
      Number(lastNumber.textContent).toFixed(5)
    );
  }
}

//actual operations

function performOperations(e) {
  let elem = captureElem(e);
  if (elem === "+") {
    evaluateExpression();
    operationToPerform = "+"; //acts as a failsafe and allows user to "change their mind on operation"
  } else if (elem === "-") {
    evaluateExpression();
    operationToPerform = "-";
  } else if (elem === "x" || elem === "*") {
    evaluateExpression();
    operationToPerform = "x";
  } else if (elem === "/") {
    evaluateExpression();
    operationToPerform = "/";
  }
}

//divide by zero check
function dontDivideByZero() {
  let temp = lastNumber.textContent;
  lastNumber.textContent = "Please don't :(";
  setTimeout(() => {
    lastNumber.textContent = temp;
    currentNumber.textContent = "";
  }, 1500);
}
