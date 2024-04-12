//fix this
$(document).ready(function() {
    //start to tictactoe
    $('#tic-tac-toe-play').click(function(){
        $('#start-screen').addClass('hide-background');
        $('#TicTacToe').removeClass('hide-background');
    });
    //creator menu to start screen
    $('#creator-menu').click(function() {
        $('#start-screen').addClass('hide-background');
        $('#Creator-Screen').removeClass('hide-background');
    });
    //menu to tictactoe
    $('#back-TicTacToe').click(function(){
        $('#TicTacToe-Directions').addClass('hide-background');
        $('#TicTacToe').removeClass('hide-background');
    })
    //tictactoe to menu
    $('#directions-tictactoe').click(function() {
        $('#TicTacToe').addClass('hide-background');
        $('#TicTacToe-Directions').removeClass('hide-background');
    });
    //menu to start screen
    $('#TTTmenu-to-start').click(function() {
        $('#TicTacToe-Directions').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });
    //creator info to start screen
    $('#creator-to-start').click(function() {
        $('#Creator-Screen').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });

});