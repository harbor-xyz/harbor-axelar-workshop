# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 2 2
println "" 
println "\nWe will now run ${RED}npm install yarn && yarn install${ENDCOLOR} command"
sleep 2
codePrintf "npm install yarn && yarn install"
println ""
npm install yarn && yarn install
