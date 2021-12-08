var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day8.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let displays = text.map((display) => {
  let newDisplay = display.split(/ \| /);

  return {
    input: newDisplay[0]
      .split(" ")
      .map((digit) => digit.split("").sort().join("")),
    output: newDisplay[1]
      .split(" ")
      .map((digit) => digit.split("").sort().join("")),
  };
});

let uniqueDigitCount = displays.reduce((accumulator, currentValue) => {
  let numberOfUniqueDigitSegments = [2, 4, 3, 7];
  let uniqueDigits = currentValue.output.filter(
    (digit) => numberOfUniqueDigitSegments.indexOf(digit.length) !== -1
  ).length;
  return accumulator + uniqueDigits;
}, 0);

console.log(uniqueDigitCount);
console.log("----");

let outputSum = displays.reduce((accumulator, currentValue) => {
  let displayDigits = [];

  // determine unique digits
  displayDigits[1] = currentValue.input.filter((digit) => digit.length == 2)[0];
  displayDigits[4] = currentValue.input.filter((digit) => digit.length == 4)[0];
  displayDigits[7] = currentValue.input.filter((digit) => digit.length == 3)[0];
  displayDigits[8] = currentValue.input.filter((digit) => digit.length == 7)[0];

  // determine remaining digits
  currentValue.input
    .filter((digit) => digit.length == 6)
    .forEach((digit) => {
      displaySegments = digit.split("");
      // 9 has 4's segments
      let isNine = displayDigits[4]
        .split("")
        .every((segment) => displaySegments.includes(segment));
      if (isNine) {
        displayDigits[9] = digit;
      } else {
        // 0 has 1's segments
        let isZero = displayDigits[1]
          .split("")
          .every((segment) => displaySegments.includes(segment));
        if (isZero) {
          displayDigits[0] = digit;
        } else {
          // Must be 6
          displayDigits[6] = digit;
        }
      }
    });

  currentValue.input
    .filter((digit) => digit.length == 5)
    .forEach((digit) => {
      displaySegments = digit.split("");
      // 3 has 1's segments
      let isThree = displayDigits[1]
        .split("")
        .every((segment) => displaySegments.includes(segment));
      if (isThree) {
        displayDigits[3] = digit;
      } else {
        // 5 has 3 of 4's segments
        let isFive = displayDigits[4]
          .split("")
          .filter((segment) => displaySegments.includes(segment)).length;
        if (isFive == 3) {
          displayDigits[5] = digit;
        } else {
          // Must be 2
          displayDigits[2] = digit;
        }
      }
    });

  // decode digits
  let displayValue = parseInt(
    currentValue.output.map((digit) => displayDigits.indexOf(digit)).join("")
  );

  return accumulator + displayValue;
}, 0);

console.log(outputSum);
