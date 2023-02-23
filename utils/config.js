const fs = require("fs");

// PLEASE INPUT A TESTNET NAME!
let TESTNET_NAME = "";

function generateRandomSuffix() {
  return `-${Math.floor(Math.random() * 1000)}`;
}

function generateTestnetName() {
  if (TESTNET_NAME.length === 0) {
    throw new Error("Please input a testnet name in utils/config.js");
  }
  let testnetName = TESTNET_NAME + generateRandomSuffix();
  try {
    _writeToTestnetName(testnetName);
  } catch (err) {
    // fallback to default value
    _writeToTestnetName(testnetName);
  }
  console.log("Here is the testnet name:  " + testnetName);
  return testnetName;
}

function readTestnetName() {
  let testnetName;
  try {
    testnetName = fs.readFileSync("./testname.txt", "utf-8").trim();
  } catch (err) {
    // fallback to default value
    throw new Error("Please run applyTestnet, can't find any testnet created from this workshop");
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
  generateTestnetName, generateRandomSuffix, readTestnetName
};
