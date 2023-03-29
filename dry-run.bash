#!/bin/bash

RED="\e[91m"
GREEN="\e[32m"
BOLDGREEN="\e[1;${GREEN}"
ITALICRED="\e[3;${RED}"
ENDCOLOR="\e[0m"
clear
printf "Welcome to ${BOLDGREEN}Axelar Demo${ENDCOLOR} Testnet, Powered by ${BOLDGREEN}Harbor${ENDCOLOR}"
printf "\n"
printf "===================================================="
printf "\n"
printf "We will now run ${ITALICRED}yarn install${ENDCOLOR} command"
sleep 2

printf "\n"
printf "Command: yarn install\n"
sleep 3
yarn install

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "compile hardhat contracts\n"
printf "Command: npx hardhat compile\n"
sleep 3
npx hardhat compile

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "Opening the file ${GREEN}./utils/config.js${ENDCOLOR}"
code -r ./utils/config.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy
sed -i "" 's/let TESTNET_NAME = "";/let TESTNET_NAME="harbor-interop-workshop"/' ./utils/config.js

printf "\n"
printf "Opening the file ${GREEN}./scripts/applyTestnet.js${ENDCOLOR}"
code -r ./scripts/applyTestnet.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "Running ${GREEN}./scripts/applyTestnet.js${ENDCOLOR} script\n"
printf "Command: node ./scripts/applyTestnet.js\n"
sleep 3
node ./scripts/applyTestnet.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "Opening the file ${GREEN}./scripts/executeCrossChainCall.js${ENDCOLOR}\n"
code -r ./scripts/executeCrossChainCall.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "Executing cross-chain message passing"
printf "Command: node ./scripts/executeCrossChainCall.js\n"
sleep 3
node ./scripts/executeCrossChainCall.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy
clear

printf "\n"
printf "Opening the file ${GREEN}./scripts/diagnosis.js${ENDCOLOR}"
code -r ./scripts/diagnosis.js

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "retrieving testnet logs through ${GREEN}./scripts/diagnosis.js${ENDCOLOR}\n"
printf "Command: node ./scripts/diagnosis.js\n"
sleep 3
node ./scripts/diagnosis.js

# LOOKING FINE UNTIL HERE

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "opening polygon smart contract\n"
code -r ./contracts/polygon_contracts/MessageReceiver.sol

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy
printf "go to line 30"
code -g ./contracts/polygon_contracts/MessageReceiver.sol:30

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "removing erroring line"
sed -i "" '30 s/^/\/\//' ./contracts/polygon_contracts/MessageReceiver.sol

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy
printf "compile hardhat contracts again\n"
printf "Command: npx hardhat compile\n"
sleep 3
npx hardhat compile

printf "${RED}apply the changes to the testnet${ENDCOLOR}"

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy
code -r ./test/test-cross-chain-call.test.js

code -g ./test/test-cross-chain-call.test.js:35
printf "Command: yarn jest test/test-cross-chain-call.test.js\n"
sleep 3
yarn jest test/test-cross-chain-call.test.js 

printf "\n"
read  -n 1 -p "Press enter to proceed..." dummy

printf "\n"
printf "Thank you for watching!"
