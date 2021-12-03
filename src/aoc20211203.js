var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day3.txt");
var text = fs.readFileSync(file, "utf-8").trim();
var diagnostics = text
  .split("\n")
  .map((value) => value.split("").map((i) => parseInt(i)));

let mask = function (array) {
  let valueResults = [...array[0]].map((i) => 0);
  return array
    .reduce((accumulator, value) => {
      value.forEach((value, i) => {
        if (value == 1) {
          accumulator[i]++;
        }
      });
      return accumulator;
    }, valueResults)
    .map((field) => {
      if (field == array.length / 2) {
        return 1;
      }
      if (field * 2 > array.length) {
        return 1;
      } else {
        return 0;
      }
    });
};

let gamma = mask(diagnostics);

let bitFlip = [1, 0];
let epsilon = gamma.slice().map((i) => bitFlip[i]);
epsilon = parseInt(epsilon.join(""), 2);
gamma = parseInt(gamma.join(""), 2);

let powerConsumption = gamma * epsilon;
console.log(powerConsumption);

console.log("----");

let oxygenDiagnostics = diagnostics.slice();
let oxygenGeneratorRating = [...diagnostics[0]].map((i) => 0);

for (let i = 0; i < diagnostics[0].length; i++) {
  oxygenGeneratorRating = mask(oxygenDiagnostics);
  oxygenDiagnostics = oxygenDiagnostics.filter(
    (diagnostic) => diagnostic[i] == oxygenGeneratorRating[i]
  );

  if (oxygenDiagnostics.length == 1) {
    break;
  }
}

let co2ScrubberDiagnostics = diagnostics.slice();
let co2ScrubberRating = [...diagnostics[0]].map((i) => 0);

for (let i = 0; i < diagnostics[0].length; i++) {
  co2ScrubberRating = mask(co2ScrubberDiagnostics).map((i) => bitFlip[i]);
  co2ScrubberDiagnostics = co2ScrubberDiagnostics.filter(
    (diagnostic) => diagnostic[i] == co2ScrubberRating[i]
  );

  if (co2ScrubberDiagnostics.length == 1) {
    break;
  }
}

let lifeSupportRating =
  parseInt(oxygenDiagnostics[0].join(""), 2) *
  parseInt(co2ScrubberDiagnostics[0].join(""), 2);

console.log(lifeSupportRating);
