var fs = require("fs");
var path = require("path");
const Graph = require("node-dijkstra");
const exp = require("constants");

let file = path.join(__dirname, "..", "data", "day15.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let map = text.map((line) => line.split("").map((number) => parseInt(number)));

let surroundingPoints = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
let maxX = map.length - 1;
let maxY = map[0].length - 1;
console.log(maxX, maxY);

let map2Graph = function (map) {
  return map.reduce((acc, row, x) => {
    let newRoutes = row.reduce((acc2, column, y) => {
      let currentPointKey = `${x},${y}`;
      acc[currentPointKey] = {};
      surroundingPoints
        .map((point) => [point[0] + x, point[1] + y])
        .filter(
          (point) =>
            map[point[0]] !== undefined && map[point[0]][point[1]] !== undefined
        )
        .forEach((point) => {
          let newPointKey = `${point[0]},${point[1]}`;
          acc[currentPointKey][newPointKey] = map[point[0]][point[1]];
        });
      return acc;
    }, {});
    return acc;
  }, {});
};

let graphMap = map2Graph(map);

let route = new Graph(graphMap);

let subPath = route.path("0,0", `${maxX},${maxY}`, { cost: true });
console.log(subPath.cost);
console.log("----");

let tileIncrese = [1, 2, 3, 4];

let expandedMap = map.map((row) => {
  let newRow = [...row];
  tileIncrese.forEach((increase) => {
    let newColums = [...row]
      .map((column) => column + increase)
      .map((column) => (column > 9 ? column - 9 : column));
    newRow = [...newRow, ...newColums];
  });
  return newRow;
});

tileIncrese
  .map((increase) =>
    expandedMap.map((row) =>
      row
        .map((column) => column + increase)
        .map((column) => (column > 9 ? column - 9 : column))
    )
  )
  .forEach((section) => {
    expandedMap = [...expandedMap, ...section];
  });

maxX = expandedMap.length - 1;
maxY = expandedMap[0].length - 1;

graphMap = map2Graph(expandedMap);

route = new Graph(graphMap);

subPath = route.path("0,0", `${maxX},${maxY}`, { cost: true });
console.log(subPath.cost);
