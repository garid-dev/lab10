export function sumTo(number) {
  if (!Number.isInteger(number) || number < 0) {
    throw new RangeError("sumTo requires a non-negative integer.");
  }

  let total = 0;
  for (let current = 1; current <= number; current += 1) {
    total += current;
  }
  return total;
}

export function factorial(number) {
  if (!Number.isInteger(number) || number < 0) {
    throw new RangeError("factorial requires a non-negative integer.");
  }

  let result = 1;
  for (let current = 2; current <= number; current += 1) {
    result *= current;
  }
  return result;
}

export function isPrime(number) {
  if (!Number.isInteger(number) || number < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      return false;
    }
  }
  return true;
}

export function fizzBuzz(limit) {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError("fizzBuzz requires a non-negative integer.");
  }

  const result = [];
  for (let number = 1; number <= limit; number += 1) {
    if (number % 15 === 0) {
      result.push("FizzBuzz");
    } else if (number % 3 === 0) {
      result.push("Fizz");
    } else if (number % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(number);
    }
  }
  return result;
}

export function countVowels(value) {
  if (typeof value !== "string") {
    throw new TypeError("countVowels requires a string.");
  }

  const vowels = "aeiouAEIOUаэиоуөүАЭИОУӨҮ";
  let count = 0;
  for (let index = 0; index < value.length; index += 1) {
    for (let vowelIndex = 0; vowelIndex < vowels.length; vowelIndex += 1) {
      if (value[index] === vowels[vowelIndex]) {
        count += 1;
        break;
      }
    }
  }
  return count;
}

export function isPalindrome(value) {
  if (typeof value !== "string") {
    throw new TypeError("isPalindrome requires a string.");
  }

  const normalized = value.trim().toLowerCase();
  for (let left = 0, right = normalized.length - 1; left < right; left += 1, right -= 1) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
  }
  return true;
}

export function maxOf(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError("maxOf requires a non-empty array.");
  }

  let maximum = values[0];
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] > maximum) {
      maximum = values[index];
    }
  }
  return maximum;
}

export function digitSum(number) {
  if (!Number.isInteger(number)) {
    throw new TypeError("digitSum requires an integer.");
  }

  let remaining = number < 0 ? -number : number;
  let total = 0;
  while (remaining > 0) {
    const digit = remaining % 10;
    total += digit;
    remaining = (remaining - digit) / 10;
  }
  return total;
}
