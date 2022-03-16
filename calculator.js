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

//base functions
function add(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  return num1 + num2;
}

function subtract(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  return num1 - num2;
}

function multiply(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  return num1 * num2;
}

function divide(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  return num1 / num2;
}

document.addEventListener("click", (e) => {
  elem = e.target.textContent;
  if (operators.includes(elem)) {
    if (elem === "+") {
      lastNumber.textContent = add(
        lastNumber.textContent,
        currentNumber.textContent
      );
    } else if (elem === "-") {
      lastNumber.textContent = subtract(
        lastNumber.textContent,
        currentNumber.textContent
      );
    } else if (elem === "x") {
      lastNumber.textContent = multiply(
        lastNumber.textContent,
        currentNumber.textContent
      );
    } else if (elem === "/") {
      lastNumber.textContent = divide(
        lastNumber.textContent,
        currentNumber.textContent
      );
    }
    currentNumber.textContent = "";
  }
});
