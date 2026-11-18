import {
  countVowels,
  digitSum,
  factorial,
  fizzBuzz,
  isPalindrome,
  isPrime,
  maxOf,
  sumTo,
} from "./js/algorithms.js";
import {
  validateEmail,
  validateMessage,
  validateName,
  validatePassword,
} from "./js/validators.js";

const experimentRows = [
  { хувьсагч: "тоо", утга: 42, төрөл: typeof 42 },
  { хувьсагч: "текст", утга: "42", төрөл: typeof "42", хөрвүүлсэнТоо: Number("42") },
  { хувьсагч: "логик", утга: true, төрөл: typeof true },
];

console.table(experimentRows);
console.log("0.1 + 0.2 =", 0.1 + 0.2);

console.table([
  { функц: "sumTo(5)", "үр дүн": sumTo(5) },
  { функц: "factorial(5)", "үр дүн": factorial(5) },
  { функц: "isPrime(7)", "үр дүн": isPrime(7) },
  { функц: "fizzBuzz(5)", "үр дүн": fizzBuzz(5).join(", ") },
  { функц: "countVowels('Сайн уу')", "үр дүн": countVowels("Сайн уу") },
  { функц: "isPalindrome('level')", "үр дүн": isPalindrome("level") },
  { функц: "maxOf([3, 9, 2])", "үр дүн": maxOf([3, 9, 2]) },
  { функц: "digitSum(1234)", "үр дүн": digitSum(1234) },
]);

const form = document.querySelector("#feedback-form");
const status = document.querySelector("#feedback-status");
const fields = [
  {
    input: form.elements.name,
    validate: validateName,
    error: "Нэрийг 2–50 тэмдэгтээр оруулж, тоо бүү ашиглаарай.",
  },
  {
    input: form.elements.email,
    validate: validateEmail,
    error: "Зайгүй, нэр@домэйн.өргөтгөл хэлбэрийн имэйл оруулна уу.",
  },
  {
    input: form.elements.password,
    validate: validatePassword,
    error: "Нууц үг 8-аас доошгүй тэмдэгттэй, зайгүй, үсэг ба тоо агуулсан байна.",
  },
  {
    input: form.elements.message,
    validate: validateMessage,
    error: "Санал хүсэлтийг захын зайгүйгээр 10–500 тэмдэгтээр оруулна уу.",
  },
];

let submittedOnce = false;

function updateField(field) {
  const valid = field.validate(field.input.value);
  const errorElement = document.querySelector(`#${field.input.id}-error`);
  field.input.setAttribute("aria-invalid", String(!valid));
  errorElement.textContent = valid ? "" : field.error;
  errorElement.hidden = valid;
  return valid;
}

form.addEventListener("input", (event) => {
  const field = fields.find((item) => item.input === event.target);
  if (submittedOnce && field) {
    updateField(field);
    status.textContent = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submittedOnce = true;
  status.textContent = "";

  let firstInvalidField;
  for (const field of fields) {
    if (!updateField(field) && !firstInvalidField) {
      firstInvalidField = field.input;
    }
  }

  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  form.elements.name.value = form.elements.name.value.trim();
  form.elements.message.value = form.elements.message.value.trim();
  status.textContent = "Мэдээлэл зөв байна. Энэ демо өгөгдлийг серверт илгээхгүй.";
});
