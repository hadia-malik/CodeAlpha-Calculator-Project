//* Display elements
const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");

//* Calculator buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

//* Action buttons
const actionButtons = document.querySelectorAll("[data-action]");

//* History
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

//* Theme
const themeBtn = document.getElementById("themeBtn");
//* calculator state
let isDarkMode=true;
let history=[];
let currentValue = "0";
let previousValue = "";
let currentOperation = null;
let shouldResetDisplay = false;
// TODO Update calculator display
function updateDisplay() {
    currentDisplay.textContent = currentValue;
}
//* accessing each number button and keeping track of clicked button and updating current value
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const number = button.dataset.number;

        if (shouldResetDisplay) {
            currentValue = "";
            shouldResetDisplay = false;
        }

        if (number === "." && currentValue.includes(".")) {
            return;
        }

        if (currentValue === "0" && number !== ".") {
            currentValue = number;
        } else {
            currentValue += number;
        }

        updateDisplay();
    });
});
// * Operation buttons logic
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const operation = button.dataset.operation;

        previousValue = currentValue;
        currentOperation = operation;
        shouldResetDisplay = true;
    });
});
// TODO calculation function
function calculate() {
    // * logic for preventing missing second value problem
      if (
        previousValue === "" ||
        currentOperation === null ||
        shouldResetDisplay
    ) {
        return;
    }
    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);

    let result;

    switch (currentOperation) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                 previousDisplay.textContent =
            `${previousValue} ${currentOperation} 0`;

        currentValue = "Error";
        previousValue = "";
        currentOperation = null;
        shouldResetDisplay = true;

        updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }
    const expression =
    `${previousValue} ${currentOperation} ${currentValue} = ${result}`;

history.push(expression);
updateHistory();
     previousDisplay.textContent =
        `${previousValue} ${currentOperation} ${currentValue}`;

    currentValue = String(result);
    previousValue = "";
    currentOperation = null;
    shouldResetDisplay = true;

    updateDisplay();
}
// * action buttons logic
actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "calculate") {
            calculate();
        }
        if (action === "clear") {
            clearCalculator();
        }
        if (action === "delete") {
    deleteNumber();
}
if (action === "percentage") {
    calculatePercentage();
}
        
    });
});
// TODO function for clearing display
function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    currentOperation = null;
    shouldResetDisplay = false;

    previousDisplay.textContent = "";
    updateDisplay();
}
// TODO function for deleting number
function deleteNumber() {
    if (currentValue === "Error") {
        clearCalculator();
        return;
    }

    if (currentValue.length === 1) {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}
//  TODO function for calculating percentage
function calculatePercentage() {
    const number = Number(currentValue);

    currentValue = String(number / 100);

    updateDisplay();
}
// TODO function for history part
function updateHistory() {
    historyList.innerHTML = "";

    history.forEach((calculation) => {
        const historyItem = document.createElement("div");

        historyItem.classList.add("history-item");

        historyItem.textContent = calculation;

        historyList.appendChild(historyItem);
    });
}
// TODO clear history function
function clearHistory() {
    history = [];
    updateHistory();
}
clearHistoryBtn.addEventListener("click", () => {
    clearHistory();
});
//  * implementing same calculator functionality with keyboard buttons to
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers and decimal
    if ((key >= "0" && key <= "9") || key === ".") {
        const numberButton = document.querySelector(
            `[data-number="${key}"]`
        );

        if (numberButton) {
            numberButton.click();
        }
    }

    // Operators
    if (key === "+" || key === "-" || key === "*" || key === "/") {
        const operationButton = document.querySelector(
            `[data-operation="${key}"]`
        );

        if (operationButton) {
            operationButton.click();
        }
    }

    // Calculate
    if (key === "Enter" || key === "=") {
        const calculateButton = document.querySelector(
            '[data-action="calculate"]'
        );

        calculateButton.click();
    }

    // Delete
    if (key === "Backspace") {
        const deleteButton = document.querySelector(
            '[data-action="delete"]'
        );

        deleteButton.click();
    }

    // Clear
    if (key === "Escape") {
        const clearButton = document.querySelector(
            '[data-action="clear"]'
        );

        clearButton.click();
    }
    //percentage
    if(key === "%"){
        const percentageButton=document.querySelector(
            '[data-action="percentage"'
        );
     percentageButton.click();
    }
});
// *function for toggling between light and dark theme
function toggleTheme() {
    isDarkMode = !isDarkMode;

    document.body.classList.toggle("light-mode", !isDarkMode);

    themeBtn.textContent = isDarkMode ? "☾" : "☀";
}
// * event listner on theme button
themeBtn.addEventListener("click", () => {
    toggleTheme();
});

