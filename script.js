// stores button element location in a letiable to be referenced later
const generateBtn = document.querySelector("#generate");
// all selectable characters are stored in four different arrays
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
// Need to make some of these variables local, currently they're global for ease of writing
let selectedCharsArray = [];
let lowerCaseInclude = false;
let upperCaseInclude = false;
let numbersInclude = false;
let specialCharInclude = false;
let passwordLength = 0;
let passwordTentative = [];
let lowerCaseConfirmed = false;
let upperCaseConfirmed = false;
let numbersConfirmed = false;
let specialCharConfirmed = false;

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  // stores textarea location in a letiable to be referenced later
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}
// this function contains all the code necessary to generate the password; in the next edit I will split all this code into separate functions
function generatePassword() {
  // this block of code stores the response to a prompt to var passwordLength and validates it; and quits if they hit cancel
  passwordLength = window.prompt(
    "How many characters long would you like your password to be?"
  );
  if (passwordLength === null) {
    return;
  } else {
    // this turns their response to the length question into an integer or decimal with typeof "number", and trims any invalid characters from it
    //you could also use parseInt to trim decimals off as well
    passwordLength = parseFloat(passwordLength);
  }
  // this loop asks them again and again how many characters, until they input something valid or hit cancel
  do {
    if (
      passwordLength < 8 ||
      passwordLength > 128 ||
      !Number.isInteger(passwordLength)
    ) {
      passwordLength = window.prompt(
        "How long would you like your password to be? You must type a whole number from 8 to 128."
      );
      // if the user hits cancel, this will bring them out of the loop
      if (passwordLength === null) {
        return;
      } else {
        passwordLength = parseFloat(passwordLength);
      }
    }
    // this while specifies that the loop can't end until the input meets our specifications
  } while (
    passwordLength < 8 ||
    passwordLength > 128 ||
    !Number.isInteger(passwordLength)
  );

  // This do while loop stores their responses to the parameter questions in 4 different variables, and then verifies in the while that they said yes to at least one parameter
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
    // this checks to see if they hit yes at least once and if they didn't, notifies them with an alert box before looping them back to the first question
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
  // this variable will store all characters of the types the user selected. We set it to [], because we want it to be empty before it starts this process every time
  selectedCharsArray = [];
  // these ifs check the user's answers to see which arrays should be Confirmed in the array that we'll pull our random values from
  // if the person selected a character type, that array (lowercase, uppercase, etc.) will be joined with selectedCharsArray
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

  // This do while generates a random password from our previously created array using the password length we stored (passwordLength)
  // then it validates that all selected character types are Confirmed and loops back to the start of the do while and makes a new password if it doesn't have at least one of all selected character types

  do {
  // we have to set this to empty before each time we use it
    passwordTentative = [];
  // this for loop will run a number of times equal to passwordLength, and generates a random character from selectedCharsArray each time
  // ,creating a tentative password that we need to validate, or make sure it has at least one of each char
    for (let i = 0; i < passwordLength; i++) {
      passwordTentative.push(
        selectedCharsArray[
          Math.floor(Math.random() * selectedCharsArray.length)
        ]
      );
    
    }
    // these must be set to false before each iteration of this function
    lowerCaseConfirmed = false;
    upperCaseConfirmed = false;
    numbersConfirmed = false;
    specialCharConfirmed = false;
    // this for loop will run through each character of passwordTentative, checking to see what types of characters are in the tentative password
    // the if statements could probably all be one function called four times, using parameters; I'll do that later
    for (let i = 0; i < passwordTentative.length; i++) {
      if (lowerCaseInclude) {
        if (lowerCaseArray.includes(passwordTentative[i])) {
          lowerCaseConfirmed = true;
          console.log(passwordTentative[i] + " is lowercase");
        }
      }
      if (upperCaseInclude) {
        if (upperCaseArray.includes(passwordTentative[i])) {
          upperCaseConfirmed = true;
          console.log(passwordTentative[i] + " is uppercase");
        }
      }

      if (numbersInclude) {
        if (numbersArray.includes(passwordTentative[i])) {
          numbersConfirmed = true;
          console.log(passwordTentative[i] + " is a number");
        }
      }

      if (specialCharInclude) {
        if (specialCharArray.includes(passwordTentative[i])) {
          specialCharConfirmed = true;
          console.log(passwordTentative[i] + " is a special character");
        }
      }
    }
    // this while validates that there is at least one of each user-selected character type in passwordTentative; and loops back to generating a random password if not
  } while (
    !(lowerCaseConfirmed === lowerCaseInclude) ||
    !(upperCaseConfirmed === upperCaseInclude) ||
    !(numbersConfirmed === numbersInclude) ||
    !(specialCharConfirmed === specialCharInclude)
  );
  console.log(passwordTentative);
// This will join all the characters in passwordTentative into a string, and returns it to the writePassword function (line 111)
  return passwordTentative.join("");
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
