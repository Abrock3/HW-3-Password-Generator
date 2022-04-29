// stores element locations in variables to be referenced later
const generateBtn = document.querySelector("#generate");
const switchEl = document.querySelector("#toggle");
const hackyEls = document.querySelectorAll(".hack-mode");
const labelEl = document.querySelector("#redPill");
const toggleSwitchColor = document.querySelector(".slider");
const passwordText = document.querySelector(".password");

// all selectable characters are stored in four different arrays. This code generates arrays of lowerCase and upperCase letters using character codes
const lowerCaseArray = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + "a".charCodeAt())
);
const upperCaseArray = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + "A".charCodeAt())
);
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
let passwordLength = 0;
let password = [];

// uses several functions to generate, randomize, and write a password in the textarea
function writePassword() {
  askLength();
  if (passwordLength === null) {
    return;
  }
  askParameters();
  genCompletedPassword();
  randomizePassword();
  // creates a variable that will store the array that gets displayed during the "hacking" style display
  let passwordHackerEffect = [];
  for (let i = 0; i < passwordLength; i++) {
    passwordHackerEffect.push(0);
  }
  let currentIndex = 0;
  let randInterval = 0;
  let iterations = 0;

  if (password !== undefined) {
    // This if decided whether to proceed with hacker-style generation of the password, or standard, boring generation
    if (switchEl.checked === true) {
      // This function uses a callback to loop on itself to create the effect of the app guessing random characters until it "solves"
      function hackerEffect(cb) {
        iterations = 0;
        // this math expression takes passwordLength into account to make sure that this effect doesn't take too long to carry out at high password lengths
        // in addition, the interval length shortens as currentIndex increases, which makes the password appear to "solve" faster as it goes along
        randInterval =
          Math.floor(
            Math.random() * 10000 * Math.log(passwordLength) +
              0.5 * Math.log(passwordLength)
          ) /
          passwordLength /
          (((passwordLength + currentIndex * 4) * 0.5) / passwordLength);
        iterations = 0;
        let interval = setInterval(function () {
          iterations++;
          // this produces the effect of a setInterval nested within a setInterval, with one looping at 20 ms and the other looping at an interval of randInterval
          if (iterations * 20 >= randInterval) {
            // currentIndex is the index position that is currently getting modified
            //  after randInterval has passed iterations will increment and the callback function will restart the function assuming the password isn't complete
            passwordHackerEffect[currentIndex] = password[currentIndex];
            passwordText.value = passwordHackerEffect.join("");
            currentIndex++;
            clearInterval(interval);
            cb();
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
          window.alert("WE'RE IN. ACCESS GRANTED...TO A SECURE PASSWORD");
          return;
        }
      }
      // This is the else that displays the password instantly if the hacker-style switch is not selected
    } else {
      passwordText.value = password.join("");
    }
  }
}

// this function stores the response to a prompt to var passwordLength and loops back to the start if it doesn't meet our criteria, and quits if they hit cancel
function askLength() {
  passwordLength = window.prompt(
    "How many characters long would you like your password to be?"
  );
  if (passwordLength === null) {
    return;
  } else {
    // this turns the user's response to the length question into an integer or decimal with typeof "number", and trims any invalid characters from it
    passwordLength = parseFloat(passwordLength);
  }
  // this loop asks them again and again how many characters, until they input something valid or hit cancel
  do {
    if (
      128 < passwordLength ||
      8 > passwordLength ||
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
    128 < passwordLength ||
    8 > passwordLength ||
    !Number.isInteger(passwordLength)
  );
}

function askParameters() {

  selectedCharsArray = [];
  password = [];
  // using the xArray parameter, this function will append the array listed as an argument to selectedCharsArray
  // It will also push one character of that type to the password array, to make sure one of each selected type is included
  function concatArrays(xArray) {
    selectedCharsArray = [...selectedCharsArray, ...xArray];
    password[password.length] =
      xArray[Math.floor(Math.random() * xArray.length)];
  }
  do {
    if (window.confirm("Would you like lower case letters in your password?")) {
      concatArrays(lowerCaseArray);
    }

    if (window.confirm("Would you like upper case letters in your password?")) {
      concatArrays(upperCaseArray);
    }

    if (window.confirm("Would you like numbers in your password?")) {
      concatArrays(numbersArray);
    }

    if (window.confirm("Would you like special characters in your password?")) {
      concatArrays(specialCharArray);
    }

    // this checks to see if the user hit yes at least once and if they didn't, notifies them with an alert box before looping them back to the first question
    if (selectedCharsArray.length === 0) {
      window.alert("You must select at least one type of character.");
    }
  } while (selectedCharsArray.length === 0);
}

function genCompletedPassword() {
  // this for loop will fill the rest of the password array with randomized characters from selectedCharsArray, stopping when password is the same length the user desires
  for (let i = password.length; i < passwordLength; i++) {
    password.push(
      selectedCharsArray[Math.floor(Math.random() * selectedCharsArray.length)]
    );
  }
}

function randomizePassword() {
  let randomIndex, tempChar;
  // This function uses the fisher-yates shuffle to shuffle this array
  for (let i = 0; i < password.length; i++) {
    randomIndex = Math.floor(Math.random() * password.length);

    tempChar = password[i];
    password[i] = password[randomIndex];
    password[randomIndex] = tempChar;
  }
}
// Adds event listener to generate button and switch
generateBtn.addEventListener("click", writePassword);
switchEl.addEventListener("click", function () {
  for (let i = 0; i < hackyEls.length; i++) {
    // this for loop will cycle through elements and add and remove a class to change CSS styling
    // this will also change HTML content based on the state of the switch
    if (hackyEls[i].classList.contains("hacky")) {
      hackyEls[i].classList.remove("hacky");
      generateBtn.innerHTML = "Generate Password";
      labelEl.innerHTML =
        "You take the red pill, you stay in wonderland, and I show you how deep the rabbit hole goes.";
      toggleSwitchColor.setAttribute("style", "background-color:red;");
    } else {
      hackyEls[i].classList.add("hacky");
      generateBtn.innerHTML = "INITIALIZE";
      labelEl.innerHTML =
        "You take the blue pill, the story ends, you wake up in your bed and believe whatever you want to believe.";
      toggleSwitchColor.setAttribute("style", "background-color: blue;");
    }
  }
});
