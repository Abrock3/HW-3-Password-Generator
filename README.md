# HW-3-Password-Generator

## Description

As a homework assignment in my web developer boot camp, I was given this mock user story:

```
AS AN employee with access to sensitive data
I WANT to randomly generate a password that meets certain criteria
SO THAT I can create a strong password that provides greater security
```

I was asked to use the following list of acceptance criteria to create a password generator and satisfactorily resolve the user story:

GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page


The basic HTML and CSS code were all provided to me (aside from everything related to the "hacker style" interface); but I wrote almost all of the javascript from scratch, attempting to match the functionality that was demonstrated by the instructors in a short gif.

Matching that gif, I used prompt windows to gather information about the user's preferences, then validated their responses to make sure they met our criteria. Then those responses are used to randomly generate a new password, which is then shuffled to ensure it's random. Once the password is generated it is passed to another function, which presents the finalized password to the user, either instantly or optionally by using a hacker-movie inspired display. 

## Usage

Here's a link to the deployed webpage: https://abrock3.github.io/HW-3-Password-Generator/

![Screenshot](./assets/images/screenshot.jpg?raw=true "Screenshot")

## Credits

The HTML, CSS, and a minimal amount of the javascript were provided by Trey Eckels and the instructional team at the Georgia Tech full stack coding boot camp.

I used W3 schools a bit to learn about parsing data, scope, and using variables as arguments.

I used https://www.w3schools.com/howto/howto_css_switch.asp to create a toggle switch.

I used this post and its comments to help me through looping a setInterval using a callback function: https://stackoverflow.com/questions/18994891/javascript-setinterval-not-executing-inside-do-while-loop-for-each-iteration

I used this post to assist me with styling the "hacker-style" page formatting: https://css-tricks.com/old-timey-terminal-styling/

Added scanlines to the styling using code from this article: https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh.
## License

I cannot add a license to this content, as the HTML code, CSS, and a minimal amount of the Javascript were provided to me by my bootcamp instructors.