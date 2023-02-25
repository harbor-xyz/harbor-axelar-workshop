const Harbor = require("@harbor-xyz/harbor");
const ethers = require("ethers");
const {getTestnetName} = require('../utils/config.js');
const TIMEOUT = 300000;

// USER_TODO: add a message that will be passed from ethereum to polygon
const MESSAGE = "harbor workshop at interop";
const TESTNETNAME = getTestnetName();

/**
    This function uses the harbor library to interact with a previously created testnet on Harbor.
    It loads the smart contract instances for the testnet's Ethereum and Polygon chains, logs the initial value of
        a specific variable in the Polygon contract, and then updates the value by calling a function on the Ethereum contract.
    The function waits until the new value is reflected in the Polygon contract before logging the final value.
*/
async function runHarborApply() {
    let harbor;

    //let testnetName = getTestnetName();
    
    let testnetDetails;

    // Initialize the Harbor object with the required parameters.
    harbor = new Harbor({
        userKey: "ouE6h9Hw9HkszB9M2WsRA5",
        projectKey: "54SZRwnFTUdH2xjLZmNFFP",
    });

    // Authenticate the Harbor object with the credentials.
    await harbor.authenticate();

    // Access the already created testnet.
    testnetDetails = await harbor.testnet(TESTNETNAME);

    console.log("Testnet Details:");
    console.log("Name: ", testnetDetails.name);
    console.log("ID: ", testnetDetails.id);
    console.log("Status: ", testnetDetails.status);
    
    console.log("loading contracts... ");

    // Access the Ethereum and Polygon objects from the testnet.
    const ethereum = testnetDetails.ethereum;
    const polygon = testnetDetails.polygon;
    
    // Get the contracts from Ethereum and Polygon.
    let polygonContracts =  await polygon.contracts();
    let ethereumContracts =  await ethereum.contracts();    

    // Get the contract addresses for the contracts we want to interact with.
    let ethereumContractAddress = ethereumContracts.MessageSender.address;
    let polygonContractAddress = polygonContracts.MessageReceiver.address;

    // Create provider instances for Ethereum and Polygon.
    const ethereumProvider = new ethers.providers.JsonRpcProvider(ethereum.endpoint);
    const polygonProvider = new ethers.providers.JsonRpcProvider(polygon.endpoint);

    // Create contract instances for Ethereum and Polygon.
    const ethereumMessageSenderContract = new ethers.Contract(ethereumContractAddress, ethereumContracts.MessageSender.abi, ethereumProvider.getSigner());
    const polygonMessageReceiverContract = new ethers.Contract(polygonContractAddress, polygonContracts.MessageReceiver.abi, polygonProvider.getSigner());
    
    // Log the current value of the contract on Polygon
    console.log('--- Initially ---');
    const val = await polygonMessageReceiverContract.value();
    console.log(`value at ${polygon.chain} is "${val}"`);

    // Set the gasLimit to 3e5 (a safe overestimate) and get the gas price.
    const gasLimit = 3e5;
    const gasPrice = 1;

    // Set the remote value on Polygon using the contract instance on Ethereum.
    const tx = await ethereumMessageSenderContract.setRemoteValue(polygon.chain, polygonMessageReceiverContract.address, MESSAGE, {
        value: BigInt(Math.floor(gasLimit * gasPrice)),
    });

    // Wait for the transaction to be confirmed.
    await tx.wait();

    // Wait until the value on Polygon is updated.
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let counter = 0;
    while ((await polygonMessageReceiverContract.value()) !== MESSAGE && (counter != 10)) {
        await sleep(1000);
        counter = counter + 1;
    }

    console.log('--- After ---');
    const valAfter = await polygonMessageReceiverContract.value();
    if (valAfter != MESSAGE) {
        console.log("Something went wrong, value hasn't changed. Please check the logs");
    } else {
        console.log(`value at ${polygon.chain} is "${valAfter}"`);
    }


}

runHarborApply().catch((error) => {
    console.error("Error: ", error);
}, TIMEOUT);
