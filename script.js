// stores button element location in a letiable to be referenced later
const generateBtn = document.querySelector("#generate");

const lowerCaseArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const upperCaseArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialCharArray = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];
let selectedCharsArray = "";
let lowerCaseInclude;
let upperCaseInclude;
let numbersInclude;
let specialCharInclude;
let passwordLength = "";
let passwordPending = [];
let lowerCaseIncluded;
let upperCaseIncluded;
let numbersIncluded;
let specialCharIncluded;

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  // stores textarea location in a letiable to be referenced later
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  do {
    // this block of code asks the user how long they want their password to be,
    // then turns their response strong into a number,
    // then validates their response for our parameters and loops back to the prompt if necessary
    passwordLength = parseFloat(
      window.prompt(
        "How long would you like your password to be, from 8-128 characters?"
      )
    );
    if (
      passwordLength < 8 ||
      passwordLength > 128 ||
      !typeof passwordLength === Number ||
      !Number.isInteger(passwordLength)
    ) {
      window.alert("You must enter a whole number from 8-128.");
    }
  } while (
    passwordLength < 8 ||
    passwordLength > 128 ||
    !typeof passwordLength === Number ||
    !Number.isInteger(passwordLength)
  );

  do {
    lowerCaseInclude = window.confirm(
      "Would you like to include lower case letters in your password?"
    );
    upperCaseInclude = window.confirm(
      "Would you like to include upper case letters in your password?"
    );
    numbersInclude = window.confirm(
      "Would you like to include numbers in your password?"
    );
    specialCharInclude = window.confirm(
      "Would you like to include special characters in your password?"
    );
    if (
      !lowerCaseInclude &&
      !upperCaseInclude &&
      !numbersInclude &&
      !specialCharInclude
    ) {
      window.alert(
        "You must select at least one type of character to include."
      );
    }
  } while (
    !lowerCaseInclude &&
    !upperCaseInclude &&
    !numbersInclude &&
    !specialCharInclude
  );
  selectedCharsArray = [];
  if (lowerCaseInclude) {
    selectedCharsArray = [...selectedCharsArray, ...lowerCaseArray];
  }
  if (upperCaseInclude) {
    selectedCharsArray = [...selectedCharsArray, ...upperCaseArray];
  }
  if (numbersInclude) {
    selectedCharsArray = [...selectedCharsArray, ...numbersArray];
  }
  if (specialCharInclude) {
    selectedCharsArray = [...selectedCharsArray, ...specialCharArray];
  }
  console.log(selectedCharsArray);

  do {
    passwordPending = [];
    for (let i = 0; i < passwordLength; i++) {
      passwordPending.push(
        selectedCharsArray[
          Math.floor(Math.random() * selectedCharsArray.length)
        ]
      );
      console.log(passwordPending);
    }
    lowerCaseIncluded = false;
    upperCaseIncluded = false;
    numbersIncluded = false;
    specialCharIncluded = false;
    for (let i = 0; i < passwordPending.length; i++) {
      if (lowerCaseInclude) {
        if (lowerCaseArray.includes(passwordPending[i])) {
          lowerCaseIncluded = true;
          console.log(passwordPending[i] + " is lowercase");
        }
      }
      if (upperCaseInclude) {
        if (upperCaseArray.includes(passwordPending[i])) {
          upperCaseIncluded = true;
          console.log(passwordPending[i] + " is uppercase");
        }
      }

      if (numbersInclude) {
        if (numbersArray.includes(passwordPending[i])) {
          numbersIncluded = true;
          console.log(passwordPending[i] + " is a number");
        }
      }

      if (specialCharInclude) {
        if (specialCharArray.includes(passwordPending[i])) {
          specialCharIncluded = true;
          console.log(passwordPending[i] + " is a special character");
        }
      }
    }
  } while (
    !(lowerCaseIncluded === lowerCaseInclude) ||
    !(upperCaseIncluded === upperCaseInclude) ||
    !(numbersIncluded === numbersInclude) ||
    !(specialCharIncluded === specialCharInclude)
  );
  console.log(passwordPending);

  return passwordPending.join("");
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
