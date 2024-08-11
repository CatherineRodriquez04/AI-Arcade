/*
Created by Catherine Rodriquez
*/

$(document).ready(function() {
    //menu to tictactoe
    $('#back-TicTacToe').click(function(){
        $('#TicTacToe-Directions').addClass('hide-background');
        $('#TicTacToe').removeClass('hide-background');
    });
    //tictactoe to menu
    $('#directions-tictactoe').click(function() {
        $('#TicTacToe').addClass('hide-background');
        $('#TicTacToe-Directions').removeClass('hide-background');
    });
    //TTTmenu to start screen
    $('#TTTmenu-to-start').click(function() {
        $('#TicTacToe-Directions').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });
});