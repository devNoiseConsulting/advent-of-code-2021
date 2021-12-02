var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day1.txt");
var text = fs.readFileSync(file, "utf-8").trim();
var numbers = text.split("\n");
numbers = numbers.map((i) => parseInt(i));

let depthIncreases = function (accumulator, currentValue, i, array) {
  if (i > 0) {
    if (currentValue > array[i - 1]) {
      accumulator++;
    }
  }

  return accumulator;
};

let sum = numbers.reduce(depthIncreases, 0);

console.log(sum);

console.log("---");

sum = numbers
  .map((currentValue, i, array) => {
    return array[i] + array[i + 1] + array[i + 2];
  })
  .filter((currentValue) => Number.isInteger(currentValue))
  .reduce(depthIncreases, 0);

console.log(sum);

console.log("---");

sum = numbers
  .map((currentValue, i, array) => {
    return array[i] - array[i - 1];
  })
  .filter((currentValue) => Number.isInteger(currentValue))
  .filter((currentValue) => currentValue > 0).length;

console.log(sum);

console.log("---");

sum = numbers
  .map((currentValue, i, array) => {
    return array[i] + array[i + 1] + array[i + 2];
  })
  .filter((currentValue) => Number.isInteger(currentValue))
  .map((currentValue, i, array) => {
    return array[i] - array[i - 1];
  })
  .filter((currentValue) => Number.isInteger(currentValue))
  .filter((currentValue) => currentValue > 0).length;

console.log(sum);
