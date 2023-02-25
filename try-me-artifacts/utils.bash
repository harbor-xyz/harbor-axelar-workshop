# This file is meant only for importing and executing

RED="\e[91m"
GREEN="\e[32m"
CYAN="\e[36m"
BLUE="\e[34m"
GRAY="\e[30m"
ENDCOLOR="\e[0m"

println() {
    printf "\n$1"
}

waitForInput() {
    read  -n 1 -p "$1" dummy
}

codePrintf() {
    printf "\nCommand => ${CYAN}$1${ENDCOLOR}"
    println ""
}

# This function takes three arguments: filename, startLine & endLine 
catWithHighlightLine() {
    STARTLINE=$2
    FILE=$1
    ENDLINE=$3
    TEMP_VAR=$((STARTLINE - 1))
    if [ "$2" != "1" ]; then
        printf "${GRAY}"
        sed -n 1,$((STARTLINE-1))p $FILE 
        printf "${ENDCOLOR}"
    fi
    printf "${CYAN}"
    sed -n $2,$3p $1 | cat
    printf "${ENDCOLOR}"
    TOTAL_LINE=`cat $FILE | wc -l`
    if [ "$ENDLINE" != "$TOTAL_LINE" ]; then
        TAIL_LINES=$((TOTAL_LINE - ENDLINE))
        printf "${GRAY}"
        tail -n $TAIL_LINES $FILE
        printf "${ENDCOLOR}"
    fi 
}

codeCat() {
    printf "${CYAN}"
    cat $1
    printf "${ENDCOLOR}"
}