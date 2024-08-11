
/*
TicTacToe Game!
Created by Catherine Rodriquez
*/

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(' '); // 3x3 board
        this.winCombo = [ 
            [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
            [0, 4, 8], [2, 4, 6]               // diagonals
        ];
        this.player1 = null;
        this.player2 = null;
        this.game_mode = null;
        this.playerName1 = 'AI-1';
        this.playerName2 = 'AI-2';
        this.ai = 0;
        this.rand_holder = 0;
        this.winningValues = [0,0,0];
        this.value1 = 0;
        this.value2 = 0;
        this.value3 = 0;
    }

    clearBoard() {
        this.board = Array(9).fill(' ');
    }

    allCellsEmpty() {
        let allEmpty = true;
        $('.cell').each(function() {
            if ($(this).text().trim() !== '') {
                allEmpty = false;
                return false; // Exit the loop early if a non-empty cell is found
            }
        });
        return allEmpty;
    }

    winner(player) {
        if (player === null) return false;
        for (let combo of this.winCombo) {
            if (combo.every(pos => this.board[pos] === player)) {
                this.winningValues = combo;
                this.value1 = this.winningValues[0];
                this.value2 = this.winningValues[1];
                this.value3 = this.winningValues[2];
                return true;
            }
        }
        return false;
    }

    boardFull() {
        return !this.board.some(cell => cell === ' ');
    }

    gameOver() {
        return this.winner(this.player1) || this.winner(this.player2) || this.boardFull();
    }

    makeMove(position, player) {
        if (position >= 0 && position < 9 && this.board[position] === ' ') {
            this.board[position] = player;
            return true; // Successful move
        } else {
            return false; // Unsuccessful move
        }
    }

    undoMove(position) {
        if (position >= 0 && position < 9) {
            this.board[position] = ' ';
        }
    }

    availableMoves() {
        return this.board.reduce((acc, cell, index) => {
            if (cell === ' ') acc.push(index);
            return acc;
        }, []);
    }

    minimax(depth, alpha, beta, maximizingPlayer) {
        if (this.gameOver() || depth === 0) {
            if (this.winner(this.player2)) {
                return { score: 10 - depth, move: null }; // AI wins
            } else if (this.winner(this.player1)) {
                return { score: -10 + depth, move: null }; // Player wins
            } else {
                return { score: 0, move: null }; // Tied game
            }
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            let bestMove = null;
            for (let move of this.availableMoves()) {
                if (game.ai == 1){ 
                    this.makeMove(move, this.player1);
                }
                else if(game.ai == 2){
                    this.makeMove(move, this.player2);
                }
                else{
                    this.makeMove(move, this.player2);
                }
                let evaluation = this.minimax(depth - 1, alpha, beta, false).score;
                this.undoMove(move);
                if (evaluation > maxEval) {
                    maxEval = evaluation;
                    bestMove = move;
                }
                alpha = Math.max(alpha, maxEval);
                if (beta <= alpha) break; // Beta cutoff
            }
            return { score: maxEval, move: bestMove };
        } else {
            let minEval = Infinity;
            let bestMove = null;
            for (let move of this.availableMoves()) {
                if (game.ai == 2){ 
                    this.makeMove(move, this.player1);
                }
                else if (game.ai == 1){
                    this.makeMove(move, this.player1);
                }
                else{
                    this.makeMove(move, this.player1);
                }
                let evaluation = this.minimax(depth - 1, alpha, beta, true).score;
                this.undoMove(move);
                if (evaluation < minEval) {
                    minEval = evaluation;
                    bestMove = move;
                }
                beta = Math.min(beta, minEval);
                if (beta <= alpha) break; // Alpha cutoff
            }
            return { score: minEval, move: bestMove };
        }
    }

    playAI(currentPlayer) {
        const { move } = this.minimax(this.availableMoves().length, -Infinity, Infinity, true);
        console.log("AI plays at position: ", move);
        this.makeMove(move, currentPlayer);
        if(currentPlayer == game.player1){
            $('.currentPlayer-TTT').text(game.playerName1 +"'s Turn!"); 
        }
        else{
            $('.currentPlayer-TTT').text(game.playerName2 +"'s Turn!"); 
        }
        $(`.cell[data-position="${move}"]`).text(currentPlayer);
    }
}

// Create a new instance of TicTacToe   
const game = new TicTacToe();
let gameInProgress = false;

$(document).ready(function() {
    $('.error-TTT').addClass('hide');
    $('.announce-TTT').addClass('hide');
    $('.currentPlayer-TTT').addClass('hide');
    $('#AIvsAI').addClass('hide');

    //reset button -> will need to keep implementing
    $('#reset').click(function() {
        //reset the symbols to default (empty)
        $('.symbol-1 span').text('');
        $('.symbol-2 span').text('');

        //remove the 'clicked' class from all symbol buttons
        $('.symbol-button').removeClass('clicked');
        $('.mode-button').removeClass('clicked');
    
        //reset game mode and players
        game.game_mode = null;
        game.player1 = null;
        game.player2 = null;
        game.ai = 0;
        game.rand_holder = 0;
        game.winningValues = [0,0,0];

        //reset the board
        $('.cell').text('');
        game.clearBoard();
        $(`.cell[data-position="${game.value1}"]`).removeClass('win');
        $(`.cell[data-position="${game.value2}"]`).removeClass('win');
        $(`.cell[data-position="${game.value3}"]`).removeClass('win');
        $(`.cell[data-position="${game.value1}"]`).removeClass('lost');
        $(`.cell[data-position="${game.value2}"]`).removeClass('lost');
        $(`.cell[data-position="${game.value3}"]`).removeClass('lost');
        $(`.cell[data-position]`).removeClass('tie');

        game.value1 = 0;
        game.value2 = 0;
        game.value3 = 0;

        //hide any error or announcement messages
        $('.error-TTT').addClass('hide');
        $('.currentPlayer-TTT').addClass('hide');
        $('.announce-TTT').addClass('hide');
        $('#AIvsAI').addClass('hide');

        //set game in progress flag to false
        gameInProgress = false;
        $('.cell').off('click');
        $('.cell').click(function(){
            if(!gameInProgress || game.player1 == null){
                $('.error-TTT').removeClass('hide');
                $('.error-TTT').text("Whoops! Please Select the Game Mode & X or O to play😊");
            }
            else{
                $('.error-TTT').addClass('hide');
            }
        });
    });

    function chooseSymbol(symbol, player, button, otherButton) {
        if(game.game_mode == 3){
            return;
        }
        if(!game.allCellsEmpty()){
            $('.error-TTT').removeClass('hide');
            $('.error-TTT').text("Please Press Restart to Change Game Options😊");
        }
        if(game.allCellsEmpty()){
            var otherPlayer = (player === '#symbol-1') ? '#symbol-2' : '#symbol-1';
            if(symbol == 'X'){
                if(otherPlayer == '#symbol-1'){
                    game.player1 = 'O';
                    game.player2 = 'X';
                }
                else{
                    game.player1 = 'X';
                    game.player2 = 'O';
                }
            }
            else{
                if(otherPlayer == '#symbol-2'){
                    game.player1 = 'O';
                    game.player2 = 'X';
                }
                else{
                    game.player1 = 'X';
                    game.player2 = 'O';
                }
            }
            if(game.game_mode != null){
                $('.error-TTT').addClass('hide');
                $('.currentPlayer-TTT').text(game.player1 + "'s Turn!");
                if(game.game_mode == 1){
                    TwoPlayer();
                }
                else if(game.game_mode == 2){
                    AgainstAI();
                }
            }
            console.log("Player1: " + game.player1);
            console.log("Player2: " + game.player2);
            $('.symbol-button').removeClass('clicked');
            $(button).addClass('clicked');
            $(otherButton).addClass('clicked');
        }
    }
    //player choose symbol (X or O)
    $('#chooseX').click(function() {
        chooseSymbol('X', '#symbol-1', this, '#chooseO2');
    });
    
    $('#chooseO').click(function() {
        chooseSymbol('O', '#symbol-1', this, '#chooseX2');
    });
    
    $('#chooseX2').click(function() {
        chooseSymbol('X', '#symbol-2', this, '#chooseO');
    });
    
    $('#chooseO2').click(function() {
        chooseSymbol('O', '#symbol-2', this, '#chooseX');
    });

    //player choose mode to play
    function chooseMode(mode, name, button){
        if(game.allCellsEmpty()){
            game.game_mode = mode;
            console.log("Game Mode: " + name);
            $('.mode-button').removeClass('clicked');
            $(button).addClass('clicked');
        }
    }

    $('#Two-Player-TicTacToe').click(function(){
        if(game.allCellsEmpty()){
            gameInProgress = true; // Start the game
            chooseMode(1, 'Two Player', this);
            if(game.player1 != null){
                $('.error-TTT').addClass('hide');
                TwoPlayer();
            }
        }
        if(!game.allCellsEmpty()){
            $('.error-TTT').removeClass('hide');
            $('.error-TTT').text("Please Press Restart to Change Game Options😊");
        }
    });

    $('#Ai-against-Ai-TicTacToe').click(function(){
        if(game.allCellsEmpty()){
            gameInProgress = true; // Start the game
            chooseMode(2, 'Against AI', this);
            if(game.player1 != null){
                $('.error-TTT').addClass('hide');
                AgainstAI();
            }
        }
        if(!game.allCellsEmpty()){
            $('.error-TTT').removeClass('hide');
            $('.error-TTT').text("Please Press Restart to Change Game Options😊");
        }
    });

    $('#Ai-vs-Ai-TicTacToe').click(function(){
        if(game.allCellsEmpty()){
            gameInProgress = true; // Start the game
            chooseMode(3, 'AI vs AI', this);  
            $('.error-TTT').addClass('hide');
            AIvsAI();
        }
        if(!game.allCellsEmpty()){
            $('.error-TTT').removeClass('hide');
            $('.error-TTT').text("Please Press Restart to Change Game Options😊");
        }
    });

    //ensure player selects a mode and symbol
    $('.cell').click(function(){
        if(game.player1 == null){
            $('.error-TTT').removeClass('hide');
            $('.error-TTT').text("Whoops! Please Select the Game Mode & X or O to play😊");
        }
        else{
            $('.error-TTT').addClass('hide');
        }
    });

    function TwoPlayer(){
        $('#AIvsAI').addClass('hide');
        //randomly determine which player goes first
        const startingPlayer = Math.random() < 0.5 ? game.player1 : game.player2;
        $('.currentPlayer-TTT').removeClass('hide').text(startingPlayer + "'s Turn!");
        let currentPlayer = startingPlayer; // Start with player 1
        $('.cell').click(function() {
            if (!gameInProgress) {
                console.log("Please select game mode and player symbol first.");
                return; // Don't allow moves if game is not in progress
            }
            const position = $(this).data('position');
            if (game.board[position] === ' ' && !game.gameOver()) {
                // $('.error-TTT').addClass('hide');
                $(this).text(currentPlayer);
                game.makeMove(position, currentPlayer);
                if (game.gameOver()) {
                    if (game.winner(currentPlayer)) {
                        console.log(currentPlayer + " wins!");
                        $('.currentPlayer-TTT').addClass('hide');
                        $(`.cell[data-position="${game.value1}"]`).addClass('win');
                        $(`.cell[data-position="${game.value2}"]`).addClass('win');
                        $(`.cell[data-position="${game.value3}"]`).addClass('win');
                        $('.announce-TTT').removeClass('hide').text(currentPlayer + " is the winner!!👑");
                        return
                    } 
                    else if (game.boardFull()) {
                        console.log("It's a draw!");
                        $('.currentPlayer-TTT').addClass('hide');
                        $(`.cell`).addClass('tie');
                        $('.announce-TTT').removeClass('hide').text("It's a draw!😊");
                        return
                    }
                } 
                else {
                    //switch to the next player
                    currentPlayer = (currentPlayer === game.player1) ? game.player2 : game.player1;
                    $('.currentPlayer-TTT').text(currentPlayer + "'s Turn!"); 
                }
            } else {
                $('.error-TTT').removeClass('hide').text("Invalid Move ❌");
            }
        }); 
    }

    function AgainstAI(){
        //randomly determine the starting player
        const startingPlayer = Math.random() < 0.5 ? game.player1 : game.player2;
        $('#AIvsAI').addClass('hide');
        let currentPlayer = startingPlayer; 
        if(startingPlayer == game.player1){
            $('.currentPlayer-TTT').removeClass('hide').text(startingPlayer + "'s Turn!");
        } 
        else{
            $('.currentPlayer-TTT').removeClass('hide').text("AI's Turn!");
            setTimeout(() => {
                game.playAI(game.player2);
                currentPlayer = game.player1; // Update the current player
                $('.currentPlayer-TTT').text(currentPlayer + "'s Turn!");
            }, 500);
        }
        $('.currentPlayer-TTT').removeClass('hide');
        $('.cell').click(function() {
            const position = $(this).data('position');
            if (game.board[position] === ' ' && !game.gameOver()) {
                $(this).text(currentPlayer);
                game.makeMove(position, currentPlayer);
                if (game.gameOver()) {
                    if (game.winner(currentPlayer)) {
                        $('.currentPlayer-TTT').addClass('hide');
                        $(`.cell[data-position="${game.value1}"]`).addClass('win');
                        $(`.cell[data-position="${game.value2}"]`).addClass('win');
                        $(`.cell[data-position="${game.value3}"]`).addClass('win');
                        $('.announce-TTT').removeClass('hide').text("You are the winner!!👑");
                    } else if (game.boardFull()) {
                        $('.currentPlayer-TTT').addClass('hide');
                        $(`.cell`).addClass('tie');
                        $('.announce-TTT').removeClass('hide').text("It's a draw!😊");
                    }
                } else {
                    // Switch to the next player
                    currentPlayer = (currentPlayer === game.player1) ? game.player2 : game.player1;
                    //if AI
                    if (currentPlayer === game.player2) {
                        $('.currentPlayer-TTT').text("AI's Turn!");
                        setTimeout(() => {
                            game.playAI(game.player2);
                            if (game.winner(game.player2)) {
                                $('.currentPlayer-TTT').addClass('hide');
                                $(`.cell[data-position="${game.value1}"]`).addClass('lost');
                                $(`.cell[data-position="${game.value2}"]`).addClass('lost');
                                $(`.cell[data-position="${game.value3}"]`).addClass('lost');
                                $('.announce-TTT').removeClass('hide').text("Oh no! The AI won!😔");
                            } else if (game.boardFull()) {
                                $('.currentPlayer-TTT').addClass('hide');
                                $(`.cell`).addClass('tie');
                                $('.announce-TTT').removeClass('hide').text("It's a draw!😊");
                            }
                            currentPlayer = (currentPlayer === game.player1) ? game.player2 : game.player1;
                            $('.currentPlayer-TTT').text(currentPlayer + "'s Turn!");
                        }, 500); 
                    }
                }
            } else {
                $('.error-TTT').removeClass('hide').text("Invalid Move ❌");
            }
        });
    }

    function AIvsAI(){
        $('#AIvsAI').removeClass('hide');
        game.player1 = 'X';
        game.player2 = 'O';
        game.ai = 2;
        $('.symbol-button').removeClass('clicked');
        $('#chooseX').addClass('clicked');
        $('#chooseO2').addClass('clicked');
    }

    $('#AIvsAI').click(function() {
        beginBattle();
    });

    function beginBattle() {
        $('#AIvsAI').addClass('hide');
        $('.currentPlayer-TTT').removeClass('hide');
        let currentPlayer = (game.ai === 2) ? game.player1 : game.player2;
        if(!game.gameOver()){
            if (currentPlayer === game.player1) {
                //if AI-1 first move then random generate
                if (game.availableMoves().length === 9) {
                    let randomPosition = Math.floor(Math.random() * 9);
                    game.rand_holder = randomPosition;
                    game.makeMove(randomPosition, game.player1);
                    $('.currentPlayer-TTT').text(game.playerName1 +"'s Turn!");
                    // Switch to AI-2's turn
                    game.ai = 1;
                    beginBattle();
                    $(`.cell[data-position="${randomPosition}"]`).text(game.player1);
                } else {
                    setTimeout(() => { //delay AI-1 move
                        game.playAI(game.player1);
                        // Switch to AI-2's turn
                        game.ai = 1;
                        beginBattle();
                    }, 1000); 
                }
            } else {
                 //if AI-2 first move then random generate
                if (game.availableMoves().length === 8) {
                    placeholder = true;
                    while(placeholder){
                        let randomPosition2 = Math.floor(Math.random() * 9);
                        if(randomPosition2 != game.rand_holder){
                            setTimeout(() => {
                                game.makeMove(randomPosition2, game.player2);
                                $(`.cell[data-position="${randomPosition2}"]`).text(game.player2);
                                $('.currentPlayer-TTT').text(game.playerName2 +"'s Turn!");
                                // Switch to AI-1's turn
                                game.ai = 2;
                                beginBattle();
                            }, 1000);
                            placeholder = false;
                        }
                    }     
                } else{
                    setTimeout(() => { //delay for AI-2 move
                        game.playAI(game.player2);
                        // Switch to AI-1's turn
                        game.ai = 2;
                        beginBattle();
                    }, 1000); 
                }
            }
        } else{
            displayResults();
            return;
        }
        
    }

    function displayResults(){
        if (game.winner(game.player1)) {
            $('.currentPlayer-TTT').addClass('hide');
            $(`.cell[data-position="${game.value1}"]`).addClass('win');
            $(`.cell[data-position="${game.value2}"]`).addClass('win');
            $(`.cell[data-position="${game.value3}"]`).addClass('win');
            $('.announce-TTT').removeClass('hide').text(game.playerName1 + " has won the battle!👑");
        } else if (game.winner(game.player2)) {
            $('.currentPlayer-TTT').addClass('hide');
            $(`.cell[data-position="${game.value1}"]`).addClass('win');
            $(`.cell[data-position="${game.value2}"]`).addClass('win');
            $(`.cell[data-position="${game.value3}"]`).addClass('win');
            $('.announce-TTT').removeClass('hide').text(game.playerName2 + " has won the battle!👑");
        } else if (game.boardFull()){
            $('.currentPlayer-TTT').addClass('hide');
            $(`.cell`).addClass('tie');
            $('.announce-TTT').removeClass('hide').text("It's a draw!😊");
        }
    }

});

