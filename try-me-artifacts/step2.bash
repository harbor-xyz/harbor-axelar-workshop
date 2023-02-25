# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 3 3
println "" 

println "\nWe will now learn how to start a testnet. There are 2 important steps for the same"
println "1. Use ${RED}@harbor-xyz/harbor${ENDCOLOR} package and initialize the object with ${RED}userKey${ENDCOLOR} and ${RED}projectKey${ENDCOLOR}"
println "2. Call ${RED}authenticate${ENDCOLOR} method to authenticate the harbor object"
sleep 5

println ""
println "See highlighted code blocks below\n\n"

println "Filename: ${GREEN}scripts/applyTestnet.js${ENDCOLOR}"
println ""
catWithHighlightLine "scripts/applyTestnet.js" 1 16
sleep 2


