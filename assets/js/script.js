// stores button and switch element locations in a const to be referenced later
const generateBtn = document.querySelector("#generate");
const switchEl = document.querySelector("#toggle");
const hackyEls = document.querySelectorAll(".hack-mode");
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
let passwordHackerEffect = [];

// Write password to the .password input
function writePassword() {
  const password = generatePassword();
  passwordHackerEffect = [];
  for (let i = 0; i < passwordLength; i++) {
    passwordHackerEffect.push(0);
  }
  let currentIndex = 0;
  let randMilliseconds = 0;
  let iterations = 0;
  // stores textarea location in a const to be referenced and modified
  const passwordText = document.querySelector(".password");
  if (password !== undefined) {
    // This if decided whether to proceed with hacker-style generation of the password, or standard, boring generation
    if (switchEl.checked === true) {
      // This function uses a callback to loop on itself to create the effect of the computer guessing random characters; I wished to use a loop but it appears you can't do so with a setInterval
      function hackerEffect(callback) {
        iterations = 0;
        // this math expression takes passwordLength into account to make sure that this effect doesn't take too long to carry out at high password lengths
        // in addition, the interval length shortens as currentIndex increases, which makes the password appear to "solve" faster as it goes along
        randMilliseconds =
          Math.floor(
            Math.random() * 10000 * Math.log(passwordLength) +
              0.5 * Math.log(passwordLength)
          ) /
          passwordLength /
          (((passwordLength + currentIndex * 4) * 0.5) / passwordLength);
        iterations = 0;
        let interval = setInterval(function () {
          iterations++;
          // this produces the effect of a setInterval nested within a setInterval, with one looping at 20 ms and the other looping at an interval of randMilliseconds
          if (iterations * 20 >= randMilliseconds) {
            // currentIndex is the index position that is currently getting modified
            //  after randMilliseconds has passed iterations will increment and the callback function will restart the function assuming the password isn't complete
            passwordHackerEffect[currentIndex] = password[currentIndex];
            passwordText.value = passwordHackerEffect.join("");
            currentIndex++;
            clearInterval(interval);
            callback();
          } else {
            // creates the effect of a random character appearing at the currentIndex at an interval of 20 milliseconds
            passwordHackerEffect[currentIndex] =
              selectedCharsArray[
                Math.floor(Math.random() * selectedCharsArray.length)
              ];
            passwordText.value = passwordHackerEffect.join("");
          }
        }, 20);
      }
      // This function will loop back into hackerEffect using cbTarget as a callback function if the password isn't complete yet
      cbTarget();
      function cbTarget() {
        if (passwordHackerEffect.join("") !== password.join("")) {
          hackerEffect(cbTarget);
        } else {
          passwordText.value = password.join("");
          window.alert("ACCESS GRANTED...TO A SECURE PASSWORD");
          return;
        }
      }
      // This is the else that displays the password instantly if the hacker-style switch is not selected
    } else {
      passwordText.value = password.join("");
    }
  }
}

// This function gets called by writePassword(), it contains calls to several other functions, which together create a valid password
function generatePassword() {
  askLength();
  if (passwordLength === null) {
    return;
  }
  askParameters();
  generateCharsArray();
  const passwordValidated = generateValidatedPassword();

  // This will join all the characters in passwordValidatedinto a string, and returns it to the writePassword() function, which called the generatePassword() function
  return passwordValidated;
}

// this function stores the response to a prompt to var passwordLength and loops back to the start if it doesn't meet our criteria, and quits if they hit cancel
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
  // returns the value of the validated password back to the generatePassword() function
  return passwordTentative;
}

// Add event listener to generate button and switch
generateBtn.addEventListener("click", writePassword);
switchEl.addEventListener("click", function () {
  for (let i = 0; i < hackyEls.length; i++) {
    if (hackyEls[i].classList.contains("hacky")) {
      hackyEls[i].classList.remove("hacky");
    } else {
      hackyEls[i].classList.add("hacky");
    }
  }
});
