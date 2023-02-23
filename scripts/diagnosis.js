// Importing the Harbor module from the "@harbor-xyz/harbor" package
const Harbor = require("@harbor-xyz/harbor");
const { generateTestnetName, generateRandomSuffix, readTestnetName } = require("../utils/config.js");

// Defining a constant TIMEOUT value of 5 minutes (300000 milliseconds)
const TIMEOUT = 300000;

// Defining the name of the testnet to be used
let TESTNETNAME = readTestnetName();

const prompt = require('prompt-sync')({sigint: true});

/**
 * This function retrieves and prints the logs for a testnet in Harbor, specifically the Ethereum logs, Polygon logs,
 * and logs for the offchain actor relayer. It also stops the testnet.
 *
 * @returns {Promise<void>} - A promise that resolves when the function completes.
 * @throws {Error} - If an error occurs during the function execution.
 */
async function runHarborDiagnosis() {
  let testnet;

  // Creating a new Harbor object with authentication credentials
  harbor = new Harbor({
    userKey: "qcE21AK1HhALsFewXX7j22",
    projectKey: "ogYoDec4oHxrSXr14Mgv1z",
  });

  // Authenticating the Harbor object
  await harbor.authenticate();

  // Retrieving the testnet details
  testnet = await harbor.testnet(TESTNETNAME);

  // Printing the testnet name
  console.log("Testnet Details:");
  console.log("Testnet Name: ", testnet.name);

   // Retrieving and printing the Ethereum logs for the testnet
    prompt('Continue?');
    console.log("**** Ethereum logs ****");
    let ethereumLogs = await testnet.ethereum.logs().then((response) => {
      for (let i = 0; i < response.length; i++) {
        if(response[i].message.includes("eth_blockNumber") || response[i].message.includes("eth_chainId")) {
          continue;
        }
        console.log(response[i].message);
      }
    });

  // Retrieving and printing the Polygon logs for the testnet
  prompt('Continue?');
   console.log("**** Polygon logs ****");
    let polygonLogs = await testnet.polygon.logs().then((response) => {
      for (let i = 0; i < response.length; i++) {
        if(response[i].message.includes("eth_blockNumber") || response[i].message.includes("eth_chainId")) {
          continue;
        }
        console.log(response[i].message);
      }
    });
  
   // Retrieving and printing the logs for the offchain actor relayer
  const offChainActors = await testnet.offChainActors();
  const goAhead = prompt('Continue?');
  if(goAhead == "yes"){
    console.log(" **** Axelar Relayer **** ");
    const relayer = offChainActors["relayer"];
    console.log("***** printing Axelar Relayer logs.. ****");
    const relayerlogs = await relayer.logs();
    for (let i = 0; i < relayerlogs.length; i++) {
        console.log(relayerlogs[i].message);
    }
  }
}

// Calling the runHarborDiagnosis function and catching any errors that occur
runHarborDiagnosis().catch((error) => {
  console.error("Error: ", error);
}, TIMEOUT);