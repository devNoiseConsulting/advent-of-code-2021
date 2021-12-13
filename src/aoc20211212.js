var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day12.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let caves = text.reduce((accumulator, value) => {
  let [start, end] = value.split("-");
  if (accumulator.hasOwnProperty(start)) {
    accumulator[start].push(end);
  } else {
    accumulator[start] = [end];
  }
  if (start !== "start" && end !== "end") {
    if (accumulator.hasOwnProperty(end)) {
      accumulator[end].push(start);
    } else {
      accumulator[end] = [start];
    }
  }
  return accumulator;
}, {});
caves["end"] = [];
// console.log(caves);

// let paths = [];
// let findPaths = function (point, path) {
//   // console.log(path);
//   if (
//     point !== "start" &&
//     point == point.toLowerCase() &&
//     path.includes(point)
//   ) {
//     return path;
//   }
//   if (point == "end") {
//     console.log(path + "," + point);
//     paths.push(path + "," + point);
//     return path + "," + point;
//   }
//
//   let newPaths = caves[point].map((subPoint) => [
//     ...findPaths(subPoint, path + "," + point),
//   ]);
//   return newPaths;
// };
//
// findPaths("start", "");

let validPath = function (array) {
  return array.reduce((accumulator, point, i, arr) => {
    if (point == point.toLowerCase() && arr.indexOf(point) !== i) {
      accumulator = false;
    }
    return accumulator;
  }, true);
};

let validPath2 = function (array) {
  let pointCounts = array
    .filter((point) => point == point.toLowerCase())
    .reduce((accumulator, value) => {
      accumulator[value] = 0;
      return accumulator;
    }, {});
  pointCounts = array
    .filter((point) => point == point.toLowerCase())
    .reduce((accumulator, value) => {
      accumulator[value]++;
      return accumulator;
    }, pointCounts);

  return (
    pointCounts["start"] == 1 &&
    Object.values(pointCounts).every((count) => count <= 2) &&
    Object.values(pointCounts).filter((count) => count == 2).length <= 1
  );
};

let hasEndPoint = function (array) {
  return array.slice(-1) == "end" ? true : false;
};

let paths = [["start"]];
let fullPaths = [];
while (paths.length > 0) {
  paths = paths.reduce((accumulator, currentPath) => {
    let point = currentPath.pop();
    let newPaths = caves[point]
      .map((subPoint) => {
        return [...currentPath, point, subPoint];
      })
      .filter((currentPath) => validPath(currentPath));
    accumulator.push(...newPaths);

    return accumulator;
  }, []);
  fullPaths = [
    ...fullPaths,
    ...paths.filter((currentPath) => hasEndPoint(currentPath)),
  ];
  paths = paths.filter((currentPath) => !hasEndPoint(currentPath));
}
console.log(fullPaths.length);
console.log("----");

paths = [["start"]];
fullPaths = [];
while (paths.length > 0) {
  paths = paths.reduce((accumulator, currentPath) => {
    let point = currentPath.pop();
    let newPaths = caves[point]
      .map((subPoint) => {
        return [...currentPath, point, subPoint];
      })
      .filter((currentPath) => validPath2(currentPath));
    accumulator.push(...newPaths);

    return accumulator;
  }, []);
  fullPaths = [
    ...fullPaths,
    ...paths.filter((currentPath) => hasEndPoint(currentPath)),
  ];
  paths = paths.filter((currentPath) => !hasEndPoint(currentPath));
}
console.log(fullPaths.length);
// console.log(
//   fullPaths
//     .map((path) => path.join(","))
//     .sort()
//     .join("\n")
// );
