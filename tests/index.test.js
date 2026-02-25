const { add, subtract, multiply, divide } = require('../src/index');

describe('Math Operations', () => {

  test('add returns correct sum', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('subtract returns correct difference', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('multiply returns correct product', () => {
    expect(multiply(4, 3)).toBe(12);
  });

  test('divide returns correct quotient', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divide throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });

});