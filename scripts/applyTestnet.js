const Harbor = require("@harbor-xyz/harbor");
const { getTestnetName } = require("../utils/config.js");
const { harborConfig } = require("../utils/testnetConfig.js");
const TIMEOUT = 300000;

const TESTNETNAME = getTestnetName();

async function runHarborApply() {
  let harbor;
  let testnet;

  harbor = new Harbor({
    userKey: "ouE6h9Hw9HkszB9M2WsRA5",
    projectKey: "54SZRwnFTUdH2xjLZmNFFP",
  });
  await harbor.authenticate();

  testnet = await harbor.apply(harborConfig, TESTNETNAME);

  console.log("\n");  
  console.log("Testnet Status: ", testnet.status);
  console.log("\n");
  console.log("ID: ", testnet.id);
  console.log("\n");
  console.log("Status: ", testnet.status);
  console.log("\n");
  console.log("Ethereum Status: ", testnet.ethereum.status);
  console.log("\n");
  console.log("Polygon Status: ", testnet.polygon.status);
  console.log("\n");
  console.log("Ethereum Endpoint: ", testnet.ethereum.endpoint);
  console.log("\n");
  console.log("Polygon Endpoint: ", testnet.polygon.endpoint);
  console.log("\n");
}

runHarborApply().catch((error) => {
  console.error("Error: ", error);
}, TIMEOUT);
