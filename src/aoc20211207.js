var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day7.txt");
var text = fs.readFileSync(file, "utf-8").trim();

let crabs = text
  .split(",")
  .map((crab) => parseInt(crab))
  .sort((a, b) => {
    return a - b;
  });

let lowMiddle = Math.floor((crabs.length - 1) / 2);
let highMiddle = Math.ceil((crabs.length - 1) / 2);
let median = (crabs[lowMiddle] + crabs[highMiddle]) / 2;

let fuelCost = crabs.reduce((accumulator, currentCalue) => {
  return accumulator + Math.abs(median - currentCalue);
}, 0);

console.log(fuelCost);
console.log("----");

let max = Math.max(...crabs);
let stdDev = Math.sqrt(
  crabs.map((x) => Math.pow(x - median, 2)).reduce((a, b) => a + b) /
    crabs.length
);

let movementCosts = Array(max)
  .fill(0)
  .map((value, i) => i)
  .reduce(
    (accumulator, value, i) => {
      if (i > 0) {
        accumulator[i] = accumulator[i - 1] + value;
      }
      return accumulator;
    },
    Array(max)
      .fill(0)
      .map((value, i) => i)
  );

let movementCostTotals = [];
for (let i = median; i < Math.ceil(median + stdDev); i++) {
  movementCostTotals[i] = crabs.reduce((accumulator, currentValue) => {
    return accumulator + movementCosts[Math.abs(currentValue - i)];
  }, 0);
}

let bestMovementCost = Math.min(
  ...movementCostTotals.filter((i) => Number.isInteger(i))
);
console.log(bestMovementCost);
