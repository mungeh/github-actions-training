// Math utility module

                                                     function add(a, b) {
        return a + b;
        }

                                                       function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
                             return a * b;
}

function divide(a, b) {
  i                                                                                                                                                                  f (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };  
