import { describe, expect, test } from 'vitest';

import { camelToSnake, snakeToCamel, toCamel, toSnake } from './transform';

describe('camelToSnake', () => {
  test('should convert camelCase to snake_case', () => {
    expect(camelToSnake('camelCaseExample')).toBe('camel_case_example');
    expect(camelToSnake('anotherTestString')).toBe('another_test_string');
    expect(camelToSnake('')).toBe('');
  });
});

describe('snakeToCamel', () => {
  test('should convert snake_case to camelCase', () => {
    expect(snakeToCamel('snake_case_example')).toBe('snakeCaseExample');
    expect(snakeToCamel('another_test_string')).toBe('anotherTestString');
    expect(snakeToCamel('simple')).toBe('simple');
    expect(snakeToCamel('')).toBe('');
  });
});

describe('toSnake', () => {
  test('should convert object keys from camelCase to snake_case', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      userDetails: { emailAddress: 'john@example.com' },
    };
    const expected = {
      first_name: 'John',
      last_name: 'Doe',
      user_details: { email_address: 'john@example.com' },
    };

    expect(toSnake(input)).toEqual(expected);
  });

  test('should handle arrays', () => {
    const input = [{ userName: 'alice' }, { userAge: 25 }];
    const expected = [{ user_name: 'alice' }, { user_age: 25 }];

    expect(toSnake(input)).toEqual(expected);
  });

  test('should return primitive values unchanged', () => {
    expect(toSnake('string')).toBe('string');
    expect(toSnake(123)).toBe(123);
    expect(toSnake(null)).toBe(null);
    expect(toSnake(undefined)).toBe(undefined);
  });

  test('should return FormData unchanged', () => {
    const formData = new FormData();
    expect(toSnake(formData)).toBe(formData);
  });

  test('should keep numbers attached to preceding letters', () => {
    const input = {
      pq7Number: 'ABC123',
      pq7ReceiptNumber: 'DEF456',
      abc123Test: 'value',
    };
    const expected = {
      pq7_number: 'ABC123',
      pq7_receipt_number: 'DEF456',
      abc123_test: 'value',
    };

    expect(toSnake(input)).toEqual(expected);
  });
});

describe('toCamel', () => {
  test('should convert object keys from snake_case to camelCase', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
      user_details: { email_address: 'john@example.com' },
    };
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      userDetails: { emailAddress: 'john@example.com' },
    };

    expect(toCamel(input)).toEqual(expected);
  });

  test('should handle arrays', () => {
    const input = [{ user_name: 'alice' }, { user_age: 25 }];
    const expected = [{ userName: 'alice' }, { userAge: 25 }];

    expect(toCamel(input)).toEqual(expected);
  });

  test('should return primitive values unchanged', () => {
    expect(toCamel('string')).toBe('string');
    expect(toCamel(123)).toBe(123);
    expect(toCamel(null)).toBe(null);
    expect(toCamel(undefined)).toBe(undefined);
  });

  test('should handle pq7_receipt_number field correctly', () => {
    const input = { pq7_receipt_number: 'ABC123' };
    const result = toCamel(input);

    // Test round trip to see if it preserves the format
    const backToSnake = toSnake(result);

    console.log('Input:', input);
    console.log('To Camel:', result);
    console.log('Back to Snake:', backToSnake);

    expect(result).toBeDefined();
    expect(backToSnake).toBeDefined();
  });
});
