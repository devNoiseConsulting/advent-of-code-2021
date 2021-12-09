var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day9.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let heightmap = text.map((row) =>
  row.split("").map((column) => parseInt(column))
);

let lowPoints = [];
let basins = [];
heightmap.forEach((row, x) => {
  row.forEach((column, y) => {
    let neighbors = [];
    if (heightmap[x - 1] !== undefined) {
      neighbors.push(heightmap[x - 1][y]);
    }
    if (heightmap[x][y - 1] !== undefined) {
      neighbors.push(heightmap[x][y - 1]);
    }
    if (heightmap[x][y + 1] !== undefined) {
      neighbors.push(heightmap[x][y + 1]);
    }
    if (heightmap[x + 1] !== undefined) {
      neighbors.push(heightmap[x + 1][y]);
    }

    let lowestPoint =
      neighbors.filter((neighbor) => neighbor <= column).length == 0;
    if (lowestPoint) {
      lowPoints.push(column);
      basins.push([x, y]);
    }
  });
});

let riskLevel = lowPoints.reduce((accumulator, currentValue) => {
  return accumulator + currentValue + 1;
}, 0);

console.log(riskLevel);
console.log("----");

let basinCount = function (x, y, map, coords) {
  let location = `${x},${y}`;

  if (coords.indexOf(location) !== -1 || map[x][y] == 9) {
    return [];
  } else {
    coords.push(location);
  }
  if (map[x - 1] !== undefined) {
    coords = coords.concat(basinCount(x - 1, y, map, coords));
  }
  if (map[x][y - 1] !== undefined) {
    coords = coords.concat(basinCount(x, y - 1, map, coords));
  }
  if (map[x][y + 1] !== undefined) {
    coords = coords.concat(basinCount(x, y + 1, map, coords));
  }
  if (map[x + 1] !== undefined) {
    coords = coords.concat(basinCount(x + 1, y, map, coords));
  }

  return coords.filter(
    (location, index, array) => array.indexOf(location) == index
  );
};

let basinSizes = [];
basins.forEach(([x, y]) => {
  basinSizes.push(basinCount(x, y, heightmap, []).length);
});

let basinProduct = basinSizes
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((accumulator, currentValue) => accumulator * currentValue, 1);
console.log(basinProduct);
