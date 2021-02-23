module.exports = function check(str, bracketsConfig) {
    // split config into left and right brackets
    const leftBrackets = bracketsConfig.map((pair) => pair[0]);
    const rightBrackets = bracketsConfig.map((pair) => pair[1]);

    // create stack for processing string
    const bracketStack = [];
    // go trough the string
    // ignoring all chars exept brackets;
    for (let i = 0; i < str.length; i++) {
        const bracket = str[i];

        // Checking if we have right bracket first.
        // That will help us with cases when left and right brackets are the same
        if (rightBrackets.includes(bracket)) {
            // If we have right bracket (element of rightBrackets), 
            // check if it is pair to bracket on the top of the stack
            const indexOfRightBracket = rightBrackets.indexOf(bracket);
            const indexOfLeftBracket = leftBrackets.indexOf(bracketStack[bracketStack.length - 1])

            if (indexOfRightBracket === indexOfLeftBracket) {
                // If it is, pop from the stack (delete pair of brackets)
                bracketStack.pop();
            } else {
                // If it is not, then push it on the stack.
                // If this right bracket has no pair, then it will stay in the stack
                // and we return false at the end.
                // But it can be left brackets in case of identical left and right brackets.
                // If so, we will try to find pair for it.
                bracketStack.push(bracket);
            }
        } else if (leftBrackets.includes(bracket)) {
            // if we have left bracket (element of leftBrackets), put it in stack
            bracketStack.push(bracket);
        }
    }

    // At the end check if the stack is empty. 
    // If so, then all brackets are paired, return true.
    // If not, return false.
    return !bracketStack.length;
}
