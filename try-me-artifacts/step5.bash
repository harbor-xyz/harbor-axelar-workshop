# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 6 6
println "" 

println "\nWe will then diagonse the problem using ${GREEN}harbor SDK${ENDCOLOR}. We will print the logs from etherum and polygon chains."
sleep 2

println ""
codePrintf "node scripts/diagnosis.js"
println ""
node scripts/diagnosis.js

sleep 2; 

println "You can see in above logs that MessageReceiver.sol contains error at line number 30. Let's see that file and line"
println ""
catWithHighlightLine "contracts/polygon_contracts/MessageReceiver.sol" 30 30
sleep 2
println ""
println "It's clear from above, that line number 30 constraints the message length to be 15 Characters and clearly, our message length is more than that. We will remove the constraint for now to fix the issue"
println ""
codePrintf "sed -i '30 s/^/\/\//' ./contracts/polygon_contracts/MessageReceiver.sol"
println ""
sed -i "" '30 s/^/\/\//' ./contracts/polygon_contracts/MessageReceiver.sol
println ""
println "Now that we have fixed the issue, we will recompile the contracts and update our testnet. This may take ${RED}upto 4 Minutes${ENDCOLOR} to complete."
println ""


