const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

// Main input handler
function handleInput(value) {
  if (value === "C") {
    clearDisplay();
  } else if (value === "=") {
    calculateResult();
  } else {
    appendValue(value);
  }
}

// Append numbers/operators
function appendValue(value) {
  expression += value;
  display.value = expression;
}

// Clear display
function clearDisplay() {
  expression = "";
  display.value = "";
}

// Calculate result
function calculateResult() {
  try {
    // Prevent invalid evaluation
    if (expression === "") return;

    let result = eval(expression);

    // Handle divide by zero
    if (!isFinite(result)) {
      display.value = "Error";
      expression = "";
      return;
    }

    display.value = result;
    expression = result.toString();
  } catch (error) {
    display.value = "Invalid";
    expression = "";
  }
}

// Keyboard input handling
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    (key >= "0" && key <= "9") ||
    ["+", "-", "*", "/", "."].includes(key)
  ) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (key === "Escape") {
    clearDisplay();
  }
});