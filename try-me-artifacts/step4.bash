# Helped module, to be executed through ../try-me.bash

catWithHighlightLine "try-me-artifacts/steps.txt" 5 5
println "" 

println "\nWe will now execute the test, which passes a cross chain message from ethereum to polygon. ${GREEN}This test will fail${ENDCOLOR} due to a bug simulation. We will then diagonse the problem using ${GREEN}harbor SDK${ENDCOLOR}"
sleep 2

println ""

println "running test on previously created testnet"
sed -i "" '34 s/^/\/\//' test/test-cross-chain-call.test.js

sleep 2

sed -i "" '33 s/^\/\/\ //' test/test-cross-chain-call.test.js

sleep 2
println ""
yarn jest test/test-cross-chain-call.test.js

sleep 5

println "Test Filename: ${GREEN}test/test-cross-chain-call.test.js${ENDCOLOR}"
println ""
catWithHighlightLine "test/test-cross-chain-call.test.js" 144 146
sleep 2

sed -i "" '33 s/^/\/\// ' test/test-cross-chain-call.test.js
sed -i "" '34 s/^\/\/\ //' test/test-cross-chain-call.test.js

sleep 2 



