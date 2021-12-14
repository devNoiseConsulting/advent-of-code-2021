var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day14.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

let initialTemplate = text.shift();

let pairRules = text
  .filter((rule) => rule.includes(" -> "))
  .map((rule) => rule.split(" -> "))
  .reduce((acc, [pair, element]) => {
    // acc[pair] = pair[0] + element + pair[1];
    acc[pair] = pair[0] + element;
    return acc;
  }, {});

let template = initialTemplate;
for (let i = 0; i < 10; i++) {
  template =
    template
      .split("")
      .reduce((acc, element, i, arr) => {
        acc.push(element + arr[i + 1]);
        return acc;
      }, [])
      .filter((pair) => pair.length == 2)
      .map((pair) => (pairRules[pair] ? pairRules[pair] : pair))
      .join("") + template.slice(-1);
}

let initialCount = text
  .filter((rule) => rule.includes(" -> "))
  .map((rule) => rule.split(" -> "))
  .reduce((acc, [pair, element]) => {
    acc[element] = 0;
    return acc;
  }, {});
let elementCounts = template.split("").reduce((acc, element) => {
  acc[element]++;
  return acc;
}, initialCount);

let max = Math.max(...Object.values(elementCounts));
let min = Math.min(...Object.values(elementCounts));

// console.log(elementCounts);
console.log(max - min);
console.log("----");

pairRules = text
  .filter((rule) => rule.includes(" -> "))
  .map((rule) => rule.split(" -> "))
  .reduce((acc, [pair, element]) => {
    acc[pair] = element;
    return acc;
  }, {});

let initialPairCounts = { ...pairRules };
let pairKeys = Object.keys(initialPairCounts);
pairKeys.forEach((key) => {
  initialPairCounts[key] = 0;
});
let pairCounts = { ...initialPairCounts };

let initialPairs = initialTemplate
  .split("")
  .reduce((acc, element, i, arr) => {
    acc.push(element + arr[i + 1]);
    return acc;
  }, [])
  .filter((pair) => pair.length == 2);
initialPairs.forEach((pair) => {
  pairCounts[pair]++;
});

elementCounts = Object.values(pairRules).reduce((acc, element) => {
  acc[element] = 0;
  return acc;
}, {});
initialTemplate.split("").forEach((element) => {
  elementCounts[element]++;
});

for (let i = 0; i < 40; i++) {
  let newCounts = { ...initialPairCounts };
  pairKeys.forEach((pair) => {
    if (pairCounts[pair] > 0) {
      let element = pairRules[pair];
      elementCounts[element] += pairCounts[pair];
      newCounts[pair.slice(0, 1) + element] += pairCounts[pair];
      newCounts[element + pair.slice(-1)] += pairCounts[pair];
    }
  });
  pairCounts = { ...newCounts };
}

// console.log(elementCounts);
max = Math.max(...Object.values(elementCounts));
min = Math.min(...Object.values(elementCounts));
console.log(max - min);
