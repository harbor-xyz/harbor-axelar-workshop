# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 4 4
println "" 

println "\nWe will now compile the contracts using ${RED}hardhat${ENDCOLOR} and start the testnet using ${RED}harbor SDK${ENDCOLOR}. This operation may take ${BLUE}upto 4 Minutes${ENDCOLOR} to complete."
sleep 2

println ""
codePrintf "npx hardhat compile"
println ""
npx hardhat compile

sleep 2
println ""
codePrintf "node scripts/applyTestnet.js"
println ""


println "Filename: ${GREEN}scripts/applyTestnet.js${ENDCOLOR}"
println ""
catWithHighlightLine "scripts/applyTestnet.js" 18 18
sleep 2
node scripts/applyTestnet.js


