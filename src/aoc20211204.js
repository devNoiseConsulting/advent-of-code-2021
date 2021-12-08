var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day4.txt");
var text = fs.readFileSync(file, "utf-8").trim().split("\n");

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

let bingoNumbers = text
  .shift()
  .split(",")
  .map((i) => parseInt(i));

let currentCard = 0;
let bingoCards = text
  .slice(1)
  .map((row) => {
    let numbers = row
      .trim()
      .split(/ +/)
      .map((i) => parseInt(i));
    return numbers;
  })
  .reduce(
    (accumulator, currentValue, i, array) => {
      if (isNaN(currentValue[0])) {
        currentCard++;
        accumulator[currentCard] = [];
      } else {
        accumulator[currentCard].push(currentValue);
      }

      return accumulator;
    },
    [[]]
  );

let transposedBingoCards = bingoCards.map((card) => transpose(card));
bingoCards = bingoCards.concat(transposedBingoCards);

let winningCard = null;
let winningNumber = -1;
let numbers = [];
for (i = 5; i < bingoNumbers.length; i++) {
  numbers = bingoNumbers.slice(0, i);
  let found = false;
  found = bingoCards.find((card, i) =>
    card.some((cardRow) =>
      cardRow.every((cardNumber) => numbers.includes(cardNumber))
    )
  );

  if (found) {
    winningCard = found.slice();
    winningNumber = bingoNumbers[i - 1];
    break;
  }
}

let cardSum = winningCard
  .flat()
  .filter((cardNumber) => !numbers.includes(cardNumber))
  .reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

let winningProduct = cardSum * winningNumber;
console.log(winningProduct);

console.log("----");

let cardsWinningTurn = transposedBingoCards.map((card) => {
  let winningTurn = card
    .map((cardRow) =>
      cardRow
        .map((cardNumber) => bingoNumbers.indexOf(cardNumber))
        .reduce((accumulator, currentValue) => {
          return currentValue > accumulator ? currentValue : accumulator;
        }, 0)
    )
    .reduce((accumulator, currentValue) => {
      return currentValue < accumulator ? currentValue : accumulator;
    }, Number.MAX_SAFE_INTEGER);

  let transposedWinningTurn = transpose(card)
    .map((cardRow) =>
      cardRow
        .map((cardNumber) => bingoNumbers.indexOf(cardNumber))
        .reduce((accumulator, currentValue) => {
          return currentValue > accumulator ? currentValue : accumulator;
        }, 0)
    )
    .reduce((accumulator, currentValue) => {
      return currentValue < accumulator ? currentValue : accumulator;
    }, Number.MAX_SAFE_INTEGER);

  return winningTurn < transposedWinningTurn
    ? winningTurn
    : transposedWinningTurn;
});

let losingCardIndex = cardsWinningTurn.indexOf(
  Math.max.apply(null, cardsWinningTurn)
);

numbers = bingoNumbers.slice(0, cardsWinningTurn[losingCardIndex] + 1);

cardSum = transposedBingoCards[losingCardIndex]
  .flat()
  .filter((cardNumber) => !numbers.includes(cardNumber))
  .reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

let losingProduct = cardSum * numbers[numbers.length - 1];
console.log(losingProduct);
