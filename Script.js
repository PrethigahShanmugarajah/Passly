const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const strengthValue = document.getElementById("strengthValue");
const toast = document.getElementById("toast");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?=-";

const allCharacters = upperCase + lowerCase + numbers + symbols;

lengthInput.addEventListener("input", () => {
  let val = parseInt(lengthInput.value);
  if (isNaN(val) || val < 8) val = 8;
  if (val > 24) val = 24;
  lengthInput.value = val;
  createPassword();
});

function shuffle(str) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return "Weak";
  if (score === 3 || score === 4) return "Medium";
  return "Strong";
}

function createPassword() {
  const length = parseInt(lengthInput.value);
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  while (password.length < length) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }
  password = shuffle(password);
  passwordBox.value = password;
  strengthValue.textContent = getStrength(password);
}

function copyPassword() {
  if (!passwordBox.value) return;
  navigator.clipboard.writeText(passwordBox.value).then(() => {
    showToast("Password copied!");
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

window.onload = createPassword;
