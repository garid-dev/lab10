export const clamp = (number, minimum, maximum) => {
  if (minimum > maximum) {
    throw new RangeError("minimum must not exceed maximum.");
  }
  return Math.min(Math.max(number, minimum), maximum);
};

export const average = (...numbers) =>
  numbers.length === 0
    ? 0
    : numbers.reduce((total, number) => total + number, 0) / numbers.length;

export const greet = (name = "Зочин") => `Сайн байна уу, ${name}!`;

export const makeCounter = (start = 0) => {
  let count = start;
  return () => count++;
};

export const applyN = (fn, count, value) => {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer.");
  }
  return Array.from({ length: count }).reduce((result) => fn(result), value);
};

export const compose = (first, second) => (value) => first(second(value));
