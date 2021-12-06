const { Cipher } = require("crypto");
var fs = require("fs");
var path = require("path");
const { cursorTo } = require("readline");

let file = path.join(__dirname, "..", "data", "day5.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let lines = text
  .map((line) => line.split(" -> "))
  .map((line) => line.map((point) => point.split(",").map((i) => parseInt(i))));

let vents = [];

lines.forEach((line) => {
  let dX = line[1][0] - line[0][0];
  dX = dX == 0 ? dX : dX / Math.abs(dX);
  let dY = line[1][1] - line[0][1];
  dY = dY == 0 ? dY : dY / Math.abs(dY);

  let startX = line[0][0];
  let startY = line[0][1];
  let endX = line[1][0];
  let endY = line[1][1];

  if (startX > endX) {
    startX = endX;
    endX = line[0][0];
    dX *= -1;

    startY = endY;
    endY = line[0][1];
    dY *= -1;
  } else if (startY > endY && dX == 0) {
    startY = endY;
    endY = line[0][1];
    dY *= -1;
  }

  if (dX == 0) {
    if (vents[startX] === undefined) {
      vents[startX] = [];
    }

    for (let y = startY; y <= endY; y += dY) {
      if (vents[startX][y] === undefined) {
        vents[startX][y] = 0;
      }

      vents[startX][y]++;
    }
  } else if (dY == 0) {
    for (let x = startX; x <= endX; x += dX) {
      if (vents[x] === undefined) {
        vents[x] = [];
      }

      if (vents[x][startY] === undefined) {
        vents[x][startY] = 0;
      }

      vents[x][startY]++;
    }
  }
});

let ventCount = vents.flat().filter((vent) => vent > 1).length;
console.log(ventCount);
console.log("----");

lines.forEach((line) => {
  let dX = line[1][0] - line[0][0];
  dX = dX == 0 ? dX : dX / Math.abs(dX);
  let dY = line[1][1] - line[0][1];
  dY = dY == 0 ? dY : dY / Math.abs(dY);

  let startX = line[0][0];
  let startY = line[0][1];
  let endX = line[1][0];
  let endY = line[1][1];

  if (startX > endX) {
    startX = endX;
    endX = line[0][0];
    dX *= -1;

    startY = endY;
    endY = line[0][1];
    dY *= -1;
  } else if (startY > endY && dX == 0) {
    startY = endY;
    endY = line[0][1];
    dY *= -1;
  }

  if (dX !== 0 && dY !== 0) {
    let y = startY;
    for (let x = startX; x <= endX; x += dX) {
      if (vents[x] === undefined) {
        vents[x] = [];
      }

      if (vents[x][y] === undefined) {
        vents[x][y] = 0;
      }

      vents[x][y]++;
      y += dY;
    }
  }
});

ventCount = vents.flat().filter((vent) => vent > 1).length;
console.log(ventCount);
