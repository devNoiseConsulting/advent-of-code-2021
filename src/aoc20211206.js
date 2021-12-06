const { Cipher } = require("crypto");
var fs = require("fs");
var path = require("path");
const { cursorTo } = require("readline");

let file = path.join(__dirname, "..", "data", "day6.txt");
var text = fs.readFileSync(file, "utf-8").trim();

let oldSchool = text.split(",").map((fish) => parseInt(fish));
let school = oldSchool.slice();

for (let days = 1; days <= 80; days++) {
  school = school.map((fish) => fish - 1);
  let newFish = school.filter((fish) => fish == -1).map((fish) => 8);
  school = school
    .map((fish) => {
      if (fish == -1) {
        return 6;
      } else {
        return fish;
      }
    })
    .concat(newFish);
}

console.log(school.length);
console.log("----");

let newSchool = oldSchool.reduce((accumulator, currentValue) => {
  accumulator[currentValue]++;
  return accumulator;
}, Array(9).fill(0));

for (let days = 1; days <= 256; days++) {
  let newFish = newSchool.shift();
  newSchool[6] += newFish;
  newSchool[8] = newFish;
}

let fishCount = newSchool.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(fishCount);
