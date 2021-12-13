const { resolveObjectURL } = require("buffer");
var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day13.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let coords = text
  .filter((line) => line.includes(","))
  .map((line) => line.split(",").map((number) => parseInt(number)));

let maxX =
  coords.reduce((acc, value) => (acc < value[0] ? value[0] : acc), -1) + 1;
let maxY =
  coords.reduce((acc, value) => (acc < value[1] ? value[1] : acc), -1) + 1;

let paper = Array(maxY)
  .fill(".")
  .map((row) => Array(maxX).fill("."));

paper = coords.reduce((accumulator, [x, y]) => {
  accumulator[y][x] = "#";
  return accumulator;
}, paper);

let folds = text
  .filter((line) => line.includes("fold"))
  .map((line) => line.split(" ")[2].split("="));

let mergeArrays = function (array1, array2) {
  array2.forEach((row, y) =>
    row.forEach((column, x) => {
      if (column == "#") {
        array1[y][x] = "#";
      }
    })
  );
  return array1;
};

let foldY = function (y, array) {
  let arr1 = array.slice(0, y);
  let arr2 = array.slice(y + 1).reverse();

  return mergeArrays(arr1, arr2);
};

let foldX = function (x, array) {
  let arr1 = array.slice().map((row) => row.filter((column, i) => i < x));
  let arr2 = array
    .slice()
    .map((row) => row.filter((column, i) => i >= x).reverse());

  return mergeArrays(arr1, arr2);
};

let [axis, index] = folds[0];
if (axis == "y") {
  paper = foldY(parseInt(index), paper);
} else {
  paper = foldX(parseInt(index), paper);
}

let dotCount = paper.reduce((accumulator, row) => {
  return accumulator + row.filter((column) => column == "#").length;
}, 0);

console.log(dotCount);
console.log("---");

folds.forEach(([axis, index]) => {
  if (axis == "y") {
    paper = foldY(parseInt(index), paper);
  } else {
    paper = foldX(parseInt(index), paper);
  }
});
console.log(
  paper
    .map((row) => row.map((column) => (column == "." ? " " : column)).join(""))
    .join("\n")
);
