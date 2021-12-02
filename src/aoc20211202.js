var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day2.txt");
var text = fs.readFileSync(file, "utf-8").trim();
var instructions = text
  .split("\n")
  .map((value) => value.split(" "))
  .map((value) => {
    value[1] = parseInt(value[1]);
    return value;
  });

global.forward = function forward(move, location) {
  location[0] += move;
  return location;
};

global.up = function up(move, location) {
  location[1] -= move;
  return location;
};

global.down = function down(move, location) {
  location[1] += move;
  return location;
};

let finalLocationProduct = instructions
  .reduce(
    (accumulator, instruction) => {
      return global[instruction[0]](instruction[1], accumulator);
    },
    [0, 0]
  )
  .reduce((accumulator, location) => {
    return accumulator * location;
  }, 1);

console.log(finalLocationProduct);

console.log("---");

global.forward = function forward(move, location) {
  location[0] += move;
  location[1] += move * location[2];
  return location;
};

global.up = function up(move, location) {
  location[2] -= move;
  return location;
};

global.down = function down(move, location) {
  location[2] += move;
  return location;
};

finalLocationProduct = instructions
  .reduce(
    (accumulator, instruction) => {
      return global[instruction[0]](instruction[1], accumulator);
    },
    [0, 0, 0]
  )
  .slice(0, 2)
  .reduce((accumulator, location) => {
    return accumulator * location;
  }, 1);

console.log(finalLocationProduct);
