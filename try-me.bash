#!/bin/bash

. try-me-artifacts/utils.bash

clear
println "Welcome to ${GREEN}Axelar Demo${ENDCOLOR} Testnet, Powered by ${GREEN}Harbor${ENDCOLOR}"
println "${CYAN}==================================================${ENDCOLOR}"
println ""
sleep 2

println "\nLet's check the pre-requisite for this demo"
OUTPUT=`node -v | cut -d'.' -f1 | grep 16`
if [ "$OUTPUT" == "" ]; then
    println "\n${RED}Please check if you have node v16 installed on your machine to proceed with the demo.${ENDCOLOR}\n"
    sleep 2
    exit 1
else
    println "\n${GREEN}All Good !${ENDCOLOR}"
fi
println ""
sleep 2

cat try-me-artifacts/steps.txt 

sleep 5

println "${RED}Let's Start..!!${ENDCOLOR}\n"
waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step1.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step2.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step2-1.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step3.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step4.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step5.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step6.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step7.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

. ./try-me-artifacts/step8.bash

waitForInput "Scroll up if needed, Press any key to continue..."
clear

printf "\n"
printf "Thank you for trying harbor. Feel free to reach out to us on hello@goharbor.xyz for any comments / questions or suggestions..!"