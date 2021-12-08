var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day8.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let displays = text.map((display) => {
  let newDisplay = display.split(/ \| /);

  return { input: newDisplay[0].split(" "), output: newDisplay[1].split(" ") };
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

/*
0 has 6 segments
1 has 2 segments (unique)
2 has 5 segments
3 has 5 segments
4 has 4 segments (unique)
5 has 5 segments
6 has 6 segments
7 has 3 segments (unique)
8 has 7 segments (unique)
9 has 6 segments

idntify the unique numbers (1, 4, 7, 8)
2: 1
3: 7
4: 4
7: 8
6: [0, 6, 9] 9 has 4's segments, 0 has 1's segments else 6
5: [2, 3, 5] 3 has 1, 5 has 3 of 4's segments
*/

let outputSum = displays.reduce((accumulator, currentValue) => {
  let displayDigits = [];
  // determine unique digits
  displayDigits[1] = currentValue.input
    .filter((digit) => digit.length == 2)[0]
    .split("")
    .sort()
    .join("");
  displayDigits[4] = currentValue.input
    .filter((digit) => digit.length == 4)[0]
    .split("")
    .sort()
    .join("");
  displayDigits[7] = currentValue.input
    .filter((digit) => digit.length == 3)[0]
    .split("")
    .sort()
    .join("");
  displayDigits[8] = currentValue.input
    .filter((digit) => digit.length == 7)[0]
    .split("")
    .sort()
    .join("");

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
        displayDigits[9] = digit.split("").sort().join("");
      } else {
        // 0 has 1's segments
        let isZero = displayDigits[1]
          .split("")
          .every((segment) => displaySegments.includes(segment));
        if (isZero) {
          displayDigits[0] = digit.split("").sort().join("");
        } else {
          // Must be 6
          displayDigits[6] = digit.split("").sort().join("");
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
        displayDigits[3] = digit.split("").sort().join("");
      } else {
        // 5 has 3 of 4's segments
        let isFive = displayDigits[4]
          .split("")
          .filter((segment) => displaySegments.includes(segment)).length;
        if (isFive == 3) {
          displayDigits[5] = digit.split("").sort().join("");
        } else {
          displayDigits[2] = digit.split("").sort().join("");
        }
      }
    });

  // decode digits
  let displayValue = parseInt(
    currentValue.output
      .map((digit) => displayDigits.indexOf(digit.split("").sort().join("")))
      .join("")
  );

  return accumulator + displayValue;
}, 0);

console.log(outputSum);
