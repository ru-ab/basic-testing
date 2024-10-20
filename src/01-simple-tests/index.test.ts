// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 1, action: Action.Subtract });
    expect(result).toEqual(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
    expect(result).toEqual(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 4, action: Action.Divide });
    expect(result).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '3',
      b: true,
      action: Action.Subtract,
    });
    expect(result).toBeNull();
  });
});
