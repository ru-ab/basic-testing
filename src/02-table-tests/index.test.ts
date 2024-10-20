// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 1, action: 'invalid', expected: null },
  { a: '3', b: true, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );
});
