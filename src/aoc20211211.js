var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day11.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let map = text.map((row) => row.split("").map((column) => parseInt(column)));

let findFlashPoints = function (array) {
  return array.reduce((accumulator, row, x) => {
    return accumulator.concat(
      row.reduce((accumulator2, column, y) => {
        if (column > 9) {
          accumulator.push([x, y]);
        }
        return accumulator2;
      }, [])
    );
  }, []);
};

let clearFlashPoints = function (array) {
  return array.map((row) =>
    row.map((column) => {
      if (column > 9) {
        return 0;
      } else {
        return column;
      }
    })
  );
};

let increasesEnergy = function (x, y, array) {
  if (array[x] !== undefined && array[x][y] !== undefined) {
    array[x][y]++;
  }
  return array;
};

let totalFlashes = 0;
for (let i = 0; i < 100; i++) {
  map = map.map((row) => row.map((column) => column + 1));

  let falshPoints = findFlashPoints(map);
  let oldFlashCount = -1;
  let surroundingPoints = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let processedFlashPoints = [];

  while (oldFlashCount !== falshPoints.length) {
    oldFlashCount = falshPoints.length;

    falshPoints.forEach(([x, y]) => {
      flashPoint = `${x},${y}`;

      if (processedFlashPoints.indexOf(flashPoint) == -1) {
        surroundingPoints.forEach(([dX, dY]) => {
          map = increasesEnergy(x + dX, y + dY, map);
        });

        processedFlashPoints.push(flashPoint);
      }
    });

    falshPoints = findFlashPoints(map);
  }

  map = clearFlashPoints(map);
  totalFlashes += processedFlashPoints.length;
}

console.log(totalFlashes);
console.log("---");

let synchronized = false;
let turn = 100;
while (!synchronized) {
  turn++;
  map = map.map((row) => row.map((column) => column + 1));

  let falshPoints = findFlashPoints(map);
  let oldFlashCount = -1;
  let surroundingPoints = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let processedFlashPoints = [];

  while (oldFlashCount !== falshPoints.length) {
    oldFlashCount = falshPoints.length;

    falshPoints.forEach(([x, y]) => {
      flashPoint = `${x},${y}`;

      if (processedFlashPoints.indexOf(flashPoint) == -1) {
        surroundingPoints.forEach(([dX, dY]) => {
          map = increasesEnergy(x + dX, y + dY, map);
        });

        processedFlashPoints.push(flashPoint);
      }
    });

    falshPoints = findFlashPoints(map);
  }

  map = clearFlashPoints(map);
  let sum = map.reduce(
    (accumulator, row) =>
      accumulator +
      row.reduce((accumulator2, column) => accumulator2 + column, 0),
    0
  );
  if (sum == 0) {
    synchronized = true;
  }
}

console.log(turn);
