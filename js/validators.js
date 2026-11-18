export function validateName(value) {
  if (typeof value !== "string") {
    return false;
  }

  const name = value.trim();
  return name.length >= 2 && name.length <= 50 && !/\p{N}/u.test(name);
}

export function validateEmail(value) {
  if (typeof value !== "string" || value.length === 0 || /\s/.test(value)) {
    return false;
  }

  return /^[^@\s.]+@[^@\s.]+(?:\.[^@\s.]+)+$/u.test(value);
}

export function validatePassword(value) {
  if (typeof value !== "string" || value.length < 8 || /\s/.test(value)) {
    return false;
  }

  return /[A-Za-z\u0400-\u04FF]/u.test(value) && /\d/.test(value);
}

export function validateMessage(value) {
  if (typeof value !== "string") {
    return false;
  }

  const message = value.trim();
  return message.length >= 10 && message.length <= 500;
}
