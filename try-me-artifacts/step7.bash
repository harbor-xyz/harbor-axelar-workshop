# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 8 8
println "" 

println "\nWe will now execute the test, which passes a cross chain message from ethereum to polygon. ${GREEN}This test will pass${ENDCOLOR} as we fixed the bug."
sleep 2

println ""
codePrintf "yarn jest test/test-cross-chain-call.test.js"
println ""
yarn jest test/test-cross-chain-call.test.js

sleep 5

println "Test Filename: ${GREEN}test/test-cross-chain-call.test.js${ENDCOLOR}"
println ""
catWithHighlightLine "test/test-cross-chain-call.test.js" 144 146
sleep 2


