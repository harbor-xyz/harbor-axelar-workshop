// Import necessary libraries
const Harbor = require("@harbor-xyz/harbor");
const ethers = require("ethers");
const { providers, Contract, utils } = require("ethers");
const { harborConfig } = require("../utils/testnetConfig.js");
const { generateTestnetName, generateRandomSuffix, readTestnetName } = require("../utils/config.js");

const TESTNET_NAME = "fixed-testnet" + generateRandomSuffix();

// add a message here
const MESSAGE = "harbor workshop at interop in test";

const prompt = require('prompt-sync')({sigint: true});

// Define test suite
describe("Test Cross Chain Message passing", () => {
  // Declare variables used in tests
  let harbor;
  let testnet;

  const TIMEOUT = 400000;

  // Before all tests, apply harborConfig to a new testnet and authenticate user
  beforeAll(async () => {
    harbor = new Harbor({
      userKey: "ouE6h9Hw9HkszB9M2WsRA5",
      projectKey: "54SZRwnFTUdH2xjLZmNFFP",
    });
    await harbor.authenticate();
    testnet = await harbor.testnet(readTestnetName());
    
    // testnet = await harbor.apply(harborConfig, TESTNET_NAME); console.log(TESTNET_NAME);
  }, TIMEOUT);

  it(
    "Check if the cross-chain message passing works",
    async () => {
      console.log("Check if the cross-chain message passing works");
        // Access the Ethereum and Polygon objects from the testnet.
        const ethereum = testnet.ethereum;
        const polygon = testnet.polygon;
        expect(ethereum).not.toBeUndefined();
        expect(polygon).not.toBeUndefined();
        if(process.argv[3] == "true") {
          prompt('Continue?');
         }
        console.log(ethereum);

      // Get the contracts from Ethereum and Polygon.
       let ethereumContracts = await ethereum.contracts();
       let polygonContracts = await polygon.contracts();
       expect(ethereumContracts).not.toBeUndefined();
       expect(polygonContracts).not.toBeUndefined();
       if(process.argv[3] == "true") {
        prompt('Continue?');
       }
       console.log("ethereumContracts")
       console.log(ethereumContracts);

       // Get the contract addresses for the contracts we want to interact with.
       let ethereumContractAddress = ethereumContracts.MessageSender.address;
       let polygonContractAddress = polygonContracts.MessageReceiver.address;
       expect(ethereumContractAddress).not.toBeUndefined();
       expect(polygonContractAddress).not.toBeUndefined();

      // Create provider instances for Ethereum and Polygon.
       const ethereumProvider = new ethers.providers.JsonRpcProvider(
         ethereum.endpoint
       );
       const polygonProvider = new ethers.providers.JsonRpcProvider(
         polygon.endpoint
       );

       // Create contract instances for Ethereum and Polygon.
       const ethereumMessageSenderContract = new ethers.Contract(
         ethereumContractAddress,
         ethereumContracts.MessageSender.abi,
         ethereumProvider.getSigner()
       );
       const polygonMessageReceiverContract = new ethers.Contract(
         polygonContractAddress,
         polygonContracts.MessageReceiver.abi,
         polygonProvider.getSigner()
       );

      // Log the current value of the contract on Polygon.
       const initialValAtDest = await polygonMessageReceiverContract.value();

       // Set the gasLimit to 3e5 (a safe overestimate) and get the gas price.
       const gasLimit = 3e5;
       const gasPrice = 1;

       // Set the remote value on Polygon using the contract instance on Ethereum.
       const tx = await ethereumMessageSenderContract.setRemoteValue(
         polygon.chain,
         polygonMessageReceiverContract.address,
         MESSAGE,
         {
           value: BigInt(Math.floor(gasLimit * gasPrice)),
         }
       );

       // Wait for the transaction to be confirmed.
       await tx.wait();

       if(process.argv[3] == "true") {
        prompt('Continue?');
       }
       console.log("Passing value from Ethereum " + MESSAGE);

       // Wait until the value on Polygon is updated.
       let counter = 0;
       const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
       while (
         (await polygonMessageReceiverContract.value()) !== MESSAGE &&
         counter != 12
       ) {
         await sleep(1000);
         counter++;
       }

       const finalValAtDest = await polygonMessageReceiverContract.value();
       expect(finalValAtDest).toBe(MESSAGE);
       console.log("Passed value on Polygon " + finalValAtDest);
    },
    TIMEOUT
  );

  afterAll(async () => {
    // await harbor.stop(testnetName);
  }, TIMEOUT);
});
