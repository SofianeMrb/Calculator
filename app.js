let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = displayValue;
}

function calculateResult() {
    try {
        const result = evaluateExpression(displayValue);
        document.getElementById("display").value = result;
        displayValue = result.toString();
    } catch (error) {
        document.getElementById("display").value = "Error";
        displayValue = "";
    }
}

function evaluateExpression(expression) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    const tokens = expression.match(/(\d+\.\d+|\d+|[\+\-\*\/])/g);

    if (!tokens) {
        throw new Error("Invalid expression");
    }

    const stack = [];
    let currentOperator = null;

    for (const token of tokens) {
        if (operators[token]) {
            currentOperator = token;
        } else {
            const number = parseFloat(token);
            if (isNaN(number)) {
                throw new Error("Invalid number");
            }

            if (currentOperator) {
                const operand = stack.pop();
                if (operand === undefined) {
                    throw new Error("Invalid expression");
                }
                stack.push(operators[currentOperator](operand, number));
                currentOperator = null;
            } else {
                stack.push(number);
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error("Invalid expression");
    }

    return stack[0];
}
