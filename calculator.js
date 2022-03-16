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

document.addEventListener("click", (e) => {
  elem = e.target.textContent;
  if (elem === "+") {
    updateDisplay();
    operationToPerform = "+"; //acts as a failsafe and allows user to "change their mind on operation"
    document.addEventListener("click", (e) => {
      if (e.target.textContent === "=" && operationToPerform === "+")
        add(lastNumber.textContent, currentNumber.textContent);
    });
  } else if (elem === "-") {
    updateDisplay();
    operationToPerform = "-";
    document.addEventListener("click", (e) => {
      if (e.target.textContent === "=" && operationToPerform === "-") {
        subtract(lastNumber.textContent, currentNumber.textContent);
      }
    });
  } else if (elem === "x") {
    updateDisplay();
    operationToPerform = "x";
    document.addEventListener("click", (e) => {
      if (e.target.textContent === "=" && operationToPerform === "x") {
        multiply(lastNumber.textContent, currentNumber.textContent);
      }
    });
  } else if (elem === "/") {
    updateDisplay();
    operationToPerform = "/";
    document.addEventListener("click", (e) => {
      if (e.target.textContent === "=" && operationToPerform === "/") {
        divide(lastNumber.textContent, currentNumber.textContent);
      }
    });
  }
});

document.addEventListener("click", () => {
  console.log(lastNumber.textContent, currentNumber.textContent);
});
