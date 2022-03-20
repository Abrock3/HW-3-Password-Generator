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
let selectedCharsArray = [];
let lowerCaseInclude = false;
let upperCaseInclude = false;
let numbersInclude = false;
let specialCharInclude = false;
let passwordLength = 0;

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  // stores textarea location in a letiable to be referenced and modified
  const passwordText = document.querySelector("#password");
  if (password !== undefined) {
    passwordText.value = password;
  }
}

// This function gets called by writePassword(), it contains calls to several other functions which, together, create a valid password
function generatePassword() {
  askLength();
  if (passwordLength === null) {
    return;
  }
  askParameters();
  generateCharsArray();
  let passwordValidated = generateValidatedPassword();

  // This will join all the characters in passwordValidatedinto a string, and returns it to the writePassword() function, which called the generatePassword() function
  return passwordValidated.join("");
}
  // this function stores the response to a prompt to var passwordLength and validates it; and quits if they hit cancel
function askLength() {
  passwordLength = window.prompt(
    "How many characters long would you like your password to be?"
  );
  if (passwordLength === null) {
    return;
  } else {
    // this turns their response to the length question into an integer or decimal with typeof "number", and trims any invalid characters from it
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
}

function askParameters() {
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
}

function generateCharsArray() {
  // this variable will store all characters of the types the user selected. We set it to [], because we want it to be empty before it starts this process every time
  selectedCharsArray = [];
  // this function will use the previously established parameters to assemble an array of possible characters
  function concatArrays(xInclude, xArray) {
    if (xInclude) {
      selectedCharsArray = [...selectedCharsArray, ...xArray];
    }
  }

  // We can use our previously established variables as arguments in concatArrays() to assemble the array of possible characters to choose from
  concatArrays(lowerCaseInclude, lowerCaseArray);
  concatArrays(upperCaseInclude, upperCaseArray);
  concatArrays(numbersInclude, numbersArray);
  concatArrays(specialCharInclude, specialCharArray);
}

function generateValidatedPassword() {
  let lowerCaseConfirmed = false;
  let upperCaseConfirmed = false;
  let numbersConfirmed = false;
  let specialCharConfirmed = false;
  let passwordTentative = [];

  // This do while generates a random password from our previously created array using the password length we stored (passwordLength)
  // then it validates that all selected character types are included and loops back to the start of the do while to make a new password if that condition isn't met
  do {
    // this must be set to empty before each iteration of this code
    passwordTentative = [];
    // this for loop will run a number of times equal to passwordLength, and generates a random character from selectedCharsArray each time
    // creating a tentative password that we need to validate
    for (let i = 0; i < passwordLength; i++) {
      passwordTentative.push(
        selectedCharsArray[
          Math.floor(Math.random() * selectedCharsArray.length)
        ]
      );
    }
    // these must be set to false before each iteration of this code
    lowerCaseConfirmed = false;
    upperCaseConfirmed = false;
    numbersConfirmed = false;
    specialCharConfirmed = false;

    // this for loop will run through each character of passwordTentative, checking to see what types of characters are in the tentative password
    // and storing whether or not it found that type of character as true or false in a variable
    function charTypeChecker(xInclude, xArray) {
      for (let i = 0; i < passwordTentative.length; i++) {
        if (xInclude) {
          if (xArray.includes(passwordTentative[i])) {
            console.log(xArray);
            return true;
          }
        }
      }
      return false;
    }
    // using the xInclude and xArray parameters, we can use arguments within charTypeChecker to test each character type
    lowerCaseConfirmed = charTypeChecker(lowerCaseInclude, lowerCaseArray);
    upperCaseConfirmed = charTypeChecker(upperCaseInclude, upperCaseArray);
    numbersConfirmed = charTypeChecker(numbersInclude, numbersArray);
    specialCharConfirmed = charTypeChecker(
      specialCharInclude,
      specialCharArray
    );

    // this while validates that there is at least one of each user-selected character type in passwordTentative; and loops back to generating a random password if not
  } while (
    !(lowerCaseConfirmed === lowerCaseInclude) ||
    !(upperCaseConfirmed === upperCaseInclude) ||
    !(numbersConfirmed === numbersInclude) ||
    !(specialCharConfirmed === specialCharInclude)
  );
  // passes the value of the validated password back to the generatePassword() function
  return passwordTentative;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
