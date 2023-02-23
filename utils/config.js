const fs = require("fs");

// PLEASE INPUT A TESTNET NAME!
let TESTNET_NAME = "ci-cd";

function _generateRandomTestnetName() {
  return `-${Math.floor(Math.random() * 1000)}`;
}

function getTestnetName() {
  if (TESTNET_NAME.length === 0) {
    throw new Error("Please input a testnet name in utils/config.js");
  }
  let testnetName = TESTNET_NAME + _generateRandomTestnetName();
  try {
    testnetName = fs.readFileSync("./testname.txt", "utf-8").trim();
  } catch (err) {
    // fallback to default value
    _writeToTestnetName(testnetName);
  }
  console.log("Here is the testnet name:  " + testnetName);
  return testnetName;
}

function _writeToTestnetName(data) {
  fs.writeFile("testname.txt", data, (err) => {
    if (err) throw err;
  });
}

module.exports = {
  getTestnetName
};
