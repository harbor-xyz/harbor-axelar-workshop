# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 3 3
println "" 

println "\nWe will now look at the config, which contains: "
println "${RED}Axelar bridge${ENDCOLOR} with ${RED}ethereum${ENDCOLOR} and ${RED}polygon${ENDCOLOR} chains."
sleep 2

println ""
println "See highlighted code blocks below\n\n"

println "Filename: ${GREEN}utils/testnetConfig.js${ENDCOLOR}"
println ""
catWithHighlightLine "utils/testnetConfig.js" 2 7
sleep 2


