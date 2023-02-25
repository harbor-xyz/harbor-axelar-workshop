# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 7 7
println "" 

codePrintf "npx hardhat compile"
println ""
npx hardhat compile
println ""
sleep 2

println "@Mani: Please update the re-apply step here"