//ES6 Style
//Best Practice:
//1) Imports & libraries
//2) Global variables
// 3) Classes & Functions
// 4) Main line of other aspects

//Deposit money
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    //maping values e.g. A = value 2 etc
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOL_VALUES = {
    //if ACE, payout * value e.g. AAA = payout *2
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const deposit = () => {
    //while loop to trigger user input again
    while (true) {
        //prompt user input
        const depositAmount = prompt("Enter a deposit amount: ");
        //converting string to float
        const numberDepositAmount = parseFloat(depositAmount);

        //if input is not number or less than 0
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again");
        } else {
            //if input is valid/ numbers
            return numberDepositAmount;
        }
    }
}

//Determine number of lines to bet on
const getNumberOfLines = () => {
    //while loop to trigger user input again
    while (true) {
        //prompt user input
        const lines = prompt("Enter number of lines to bet on (1-3): ");
        //converting string to float
        const numberOfLines = parseFloat(lines);

        //if input is not number or less than 0 or more than 3
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again");
        } else {
            //if input is valid/ numbers
            return numberOfLines;
        }
    }
}

//Collect bet amount
//Cannot place bets more than current balance or lines
//e.g. wallet = 50, lines bet = 3, bet per line = 10 so 3 * 10 = 30 = okay
// wallet = 50, lines bet =3, bet per line = 40 so 3* 40 = 120 = no sufficient amount so invalid
const getBet = (balance, lines) => {
    //while loop to trigger user input again
    while (true) {
        //prompt user input
        const bet = prompt("Enter the bet per line: ");
        //converting string to float
        const numberBet = parseFloat(bet);

        //if input is not number or less than 0 or more than balance
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again");
        } else {
            //if input is valid/ numbers
            return numberBet;
        }
    }
};

//Spinning slot machine
const spin = () => {
    //declare array objects
    const symbols = [];
    //looping objects in arrays of symbol and count of entries in symbols count
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            //insert into array
            symbols.push(symbol);
        }
    }
    //declare reels as array
    const reels = [];
    //for each reels, and cols, generate what is inside
    for (let i = 0; i < COLS; i++) {
        //push number of cols into reels
        reels.push([]);
        //individual symbol in each reel
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            //generate 3 rows and cols and set it as random
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            //push into array
            reels[i].push(selectedSymbol);
            //remove duplicates
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

//Displaying slot machine into 3 rols and 3 cols
const transpose = (reels) => {
    const rows = [];

    //for loop to go through rows
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

//print of results of slot machine
const printSlot = (rows) => {
    //looping array of array of row
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

//Check if user won
const getWinnings = (rows, bet, lines) => {
    //declare variable
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
};

//loop for playing again
const game = () => {
    //let allows changes
    let balance = deposit();

    while (true) {
        //tell user balance is
        console.log("You have a balance of $ " + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        //balance left after bet
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printSlot(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        //balance if win
        balance += winnings;
        console.log("You won, $ " + winnings.toString());

        //if they broke af
        if(balance <=0){
            console.log("YOU BROKE");
            break;
        }
        //prompting player
        const playAgain = prompt("Do you want to play again (y/n)?");

        //if play does not press Y
        if(playAgain != "y") break;
    }

};

game();