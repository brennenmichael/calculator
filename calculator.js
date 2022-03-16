const currentNumber = document.querySelector(".current-number");
const lastNumber = document.querySelector(".last-number");
const operators = ["+", "-", "x", "/", "="];
let operationToPerform = "";

//adding numbers to currentNumber
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (!isNaN(elem.textContent)) {
    currentNumber.textContent += elem.textContent;
  }
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    currentNumber.textContent += e.key;
  }
});

//All Clear
document.addEventListener("click", (e) => {
  let elem = e.target;
  if (elem.textContent === "AC") {
    currentNumber.textContent = "";
    lastNumber.textContent = "";
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
    lastNumber.textContent = currentNumber.textContent;
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
  console.log(num1, num2);
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
  if (e.key === "=" || e.key === "Enter") evaluateExpression();
});

function evaluateExpression() {
  if (operationToPerform === "") updateDisplay();
  if (operationToPerform === "+")
    add(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "-")
    subtract(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "x")
    multiply(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "/") {
    if (currentNumber.textContent === "0") dontDivideByZero();
    else divide(lastNumber.textContent, currentNumber.textContent);
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
