var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day10.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let chunks = text.map((chunk) => chunk.split(""));

let matchingSyntax = {
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
};
let openingSyntax = ["(", "[", "{", "<"];
let syntaxErrorScore = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let score = chunks.reduce(
  (accumalator, chunk) =>
    accumalator +
    chunk.reduce(
      (acc, syntax) => {
        if (acc.score == 0) {
          if (openingSyntax.includes(syntax)) {
            acc.openSyntax.unshift(syntax);
          } else {
            if (matchingSyntax[syntax] == acc.openSyntax[0]) {
              acc.openSyntax.shift();
            } else {
              acc.score = syntaxErrorScore[syntax];
            }
          }
        }
        return acc;
      },
      { score: 0, openSyntax: [] }
    ).score,
  0
);

console.log(score);
console.log("----");

let closingScore = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

let chunkScores = chunks
  .filter(
    (chunk) =>
      chunk.reduce(
        (acc, syntax) => {
          if (acc.score == 0) {
            if (openingSyntax.includes(syntax)) {
              acc.openSyntax.unshift(syntax);
            } else {
              if (matchingSyntax[syntax] == acc.openSyntax[0]) {
                acc.openSyntax.shift();
              } else {
                acc.score = syntaxErrorScore[syntax];
              }
            }
          }
          return acc;
        },
        { score: 0, openSyntax: [] }
      ).score == 0
  )
  .map((chunk) =>
    chunk
      .reduce((acc, syntax) => {
        if (openingSyntax.includes(syntax)) {
          acc.unshift(syntax);
        } else {
          acc.shift();
        }
        return acc;
      }, [])
      .map((syntax) => matchingSyntax[syntax])
      .reduce((score, syntax) => score * 5 + closingScore[syntax], 0)
  )
  .sort((a, b) => a - b);

let middle = Math.floor((chunkScores.length - 1) / 2);

console.log(chunkScores[middle]);
