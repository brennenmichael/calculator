currentNumber = document.querySelector(".current-number");
lastNumber = document.querySelector(".last-number");
operators = ["+", "-", "x", "/", "="];

//adding numbers to currentNumber
document.addEventListener("click", (e) => {
  elem = e.target;
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
  elem = e.target;
  if (elem.textContent === "AC") {
    currentNumber.textContent = "";
    lastNumber.textContent = "";
  }
});

//Clear
document.addEventListener("click", (e) => {
  elem = e.target;
  if (elem.textContent === "C") {
    currentNumber.textContent = "";
  }
});

//Delete
document.addEventListener("click", (e) => {
  elem = e.target;
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

//base functions
function add(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  lastNumber.textContent = num1 + num2;
  currentNumber.textContent = "";
}

function addCheck() {
  document.addEventListener("click", (e) => {
    elem = captureElem(e);
  });
  document.addEventListener("keydown", (e) => {
    elem = captureElem(e);
  });
  console.log("addcheck is ", elem);
  return elem === "=" && operationToPerform === "+";
}

function subtract(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  lastNumber.textContent = num1 - num2;
  currentNumber.textContent = "";
}

function multiply(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  lastNumber.textContent = num1 * num2;
  currentNumber.textContent = "";
}

function divide(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
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
  elem = e.key;
  if (!elem) elem = e.target.textContent;
  console.log("here it is ", elem);
  return elem;
}

//once you press equals...
document.addEventListener("click", (e) => {
  if (e.target.textContent === "=") evaluateExpression();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "=") evaluateExpression();
});

function evaluateExpression() {
  if (operationToPerform === "+")
    add(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "-")
    subtract(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "x")
    multiply(lastNumber.textContent, currentNumber.textContent);
  else if (operationToPerform === "/")
    divide(lastNumber.textContent, currentNumber.textContent);
}

//actual operations

function performOperations(e) {
  elem = captureElem(e);
  if (elem === "+") {
    updateDisplay();
    operationToPerform = "+"; //acts as a failsafe and allows user to "change their mind on operation"
  } else if (elem === "-") {
    updateDisplay();
    operationToPerform = "-";
  } else if (elem === "x") {
    updateDisplay();
    operationToPerform = "x";
  } else if (elem === "/") {
    updateDisplay();
    operationToPerform = "/";
  }
}
