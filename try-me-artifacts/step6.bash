# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 7 7
println "" 

codePrintf "npx hardhat compile"
println ""
npx hardhat compile
println ""

sed -i "" '30 s/^\/\/\ //' ./contracts/polygon_contracts/MessageReceiver.sol

sleep 2
