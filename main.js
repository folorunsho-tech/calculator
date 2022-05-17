const numbers = document.querySelectorAll("button[data-numbers]");
const operators = document.querySelectorAll("button[data-operator]");
const clearBtn = document.querySelectorAll("button[value=clear]");
const answerBtn = document.querySelector("#answer");
const inputDisplay = document.querySelector(".input-display");
const answerDisplay = document.querySelector(".answer-display");
let prev = 0;
let operator = null;
let next = 0;
let calculated = false;
class Calculator {
  constructor() {
    this.operator = operator;
    this.prev = prev;
    this.next = next;
  }
  updateDisplay(prev, operator, next) {
    if (operator === null) {
      inputDisplay.textContent = `${prev} `;
    } else if (operator !== null) {
      inputDisplay.textContent = `${prev} ${operator} ${next}`;
    }
  }
  compute(prev, operator, next) {
    let computation;
    const prevEl = parseFloat(prev);
    const current = parseFloat(next);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
      case "+":
        computation = prevEl + current;
        break;
      case "-":
        computation = prevEl - current;
        break;
      case "*":
        computation = prevEl * current;
        break;
      case "/":
        computation = prevEl / current;
        break;
      default:
        return;
    }
    answerDisplay.textContent = computation;
  }
  reset() {
    next = 0;
    prev = 0;
    operator = null;
  }
  clear() {
    inputDisplay.textContent = "";
    answerDisplay.textContent = 0;
    this.reset();
  }
}
const calculator = new Calculator();
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (operator === null) {
      prev += String(number.attributes.value.value);
      calculator.updateDisplay(Number(prev), operator, Number(next));
    } else if (operator !== null) {
      next += String(number.attributes.value.value);
      calculator.updateDisplay(Number(prev), operator, Number(next));
    }
  });
});
operators.forEach((op) => {
  op.addEventListener("click", () => {
    operator = op.attributes.value.value;
    calculator.updateDisplay(Number(prev), operator, Number(next));
  });
});

answerBtn.addEventListener("click", () => {
  if (operator !== null) {
    calculator.compute(Number(prev), operator, Number(next));
    calculated = true;
  } else if (operator === null && next === 0) {
    answerDisplay.textContent = prev.toString().substring(1);
  }
});
clearBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.clear();
  });
});
