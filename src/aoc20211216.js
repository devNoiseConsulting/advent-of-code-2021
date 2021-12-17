const { sign } = require("crypto");
var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day16.txt");
var text = fs.readFileSync(file, "utf-8").trim();

let buffer = text
  .split("")
  .map((digit) => parseInt(digit, 16).toString(2).padStart(4, "0"))
  .join("");

console.log(buffer);

let instructions = [];
let packetVersions = [];
let pointer = 0;
while (pointer < buffer.length) {
  let version = parseInt(buffer.substring(pointer, pointer + 3), 2);
  packetVersions.push(version);
  pointer += 3;

  let type = parseInt(buffer.substring(pointer, pointer + 3), 2);
  pointer += 3;

  let packetValue = "";
  if (type == 4) {
    let subPacket = buffer.substring(pointer, pointer + 5);
    pointer += 5;
    packetValue += subPacket.substring(1, 5);
    while (subPacket.charAt(0) == "1") {
      subPacket = buffer.substring(pointer, pointer + 5);
      pointer += 5;
      packetValue += subPacket.substring(1, 5);
    }
    packetValue = parseInt(packetValue, 2);
  } else {
    let subPacketLength = buffer.substring(pointer, pointer + 1);
    pointer += 1;

    if (subPacketLength == "0") {
      pointer += 15;
    } else {
      pointer += 11;
    }
  }
  instructions.push([version, type, packetValue]);
}

let versionSun = packetVersions.reduce((acc, value) => acc + value, 0);
console.log(versionSun);

if (instructions[0][1] !== 4) {
  console.log("bad instruction");
  instructions.shift();
}

let operands = [];
while (instructions.length > 0) {
  let [version, type, value] = instructions.shift();
  console.log(version, type, value);

  let newValue = -1;
  console.log("newValue", newValue);
  switch (type) {
    case 0:
      newValue = operands.reduce((acc, value) => acc + value, 0);
      operands = [];
      console.log("newValue", newValue);
      break;
    case 1:
      newValue = operands.reduce((acc, value) => acc * value, 1);
      operands = [];
      console.log("newValue", newValue);
      break;
    case 2:
      newValue = Math.min(...operands);
      operands = [];
      console.log("newValue", newValue);
      break;
    case 3:
      newValue = Math.max(...operands);
      operands = [];
      console.log("newValue", newValue);
      break;
    case 4:
      operands.unshift(value);
      console.log("newValue", newValue);
      break;
    case 5:
      newValue = operands[0] < operands[1] ? 1 : 0;
      operands = operands.slice(2);
      console.log("newValue", newValue);
      break;
    case 6:
      newValue = operands[0] > operands[1] ? 1 : 0;
      operands = operands.slice(2);
      console.log("newValue", newValue);
      break;
    case 7:
      newValue = operands[0] == operands[1] ? 1 : 0;
      operands = operands.slice(2);
      console.log("newValue", newValue);
      break;
  }
  if (type !== 4) {
    instructions.unshift([version, 4, newValue]);
  }
  console.log("operator", type, operands, newValue);
}

console.log(operands[0]);
