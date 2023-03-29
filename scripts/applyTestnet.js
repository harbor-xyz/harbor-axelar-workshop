const Harbor = require("@beam-me-up/harbor");
const { generateTestnetName, generateRandomSuffix, readTestnetName } = require("../utils/config.js");
const { harborConfig } = require("../utils/testnetConfig.js");
const TIMEOUT = 300000;

const TESTNETNAME = generateTestnetName();

async function runHarborApply() {
  let harbor;
  let testnet;

  harbor = new Harbor({
    userKey: "aa08effc-ef26-4713-8dfd-e0bcf4304f27",
    projectKey: "eK9utTquodDtZoxF6gmWXq",
  });
  await harbor.authenticate();

  testnet = await harbor.apply(harborConfig, TESTNETNAME);

  console.log("\n");  
  console.log("Testnet Status: ", testnet.status);
  console.log("\n");
  console.log("ID: ", testnet.id);
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
