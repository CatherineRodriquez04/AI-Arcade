//fix this
$(document).ready(function() {
    //start to tictactoe
    $('#tic-tac-toe-play').click(function(){
        $('#start-screen').addClass('hide-background');
        $('#TicTacToe').removeClass('hide-background');
    });
    //start to wordSearch
    $('#wordSearch-play').click(function(){
        $('#start-screen').addClass('hide-background');
        $('#wordSearch').removeClass('hide-background');
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
    });
    //tictactoe to menu
    $('#directions-tictactoe').click(function() {
        $('#TicTacToe').addClass('hide-background');
        $('#TicTacToe-Directions').removeClass('hide-background');
    });
    //wordSearch to menu
    $('#directions-wordSearch').click(function() {
        $('#wordSearch').addClass('hide-background');
        $('#wordSearch-Directions').removeClass('hide-background');
    });
    //TTTmenu to start screen
    $('#TTTmenu-to-start').click(function() {
        $('#TicTacToe-Directions').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });
    //WSmenu to start screen
    $('#WSmenu-to-start').click(function() {
        $('#wordSearch-Directions').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });
    //creator info to start screen
    $('#creator-to-start').click(function() {
        $('#Creator-Screen').addClass('hide-background');
        $('#start-screen').removeClass('hide-background');
    });

    //modal for TicTacToe Summary
    var modal = document.getElementById('summaryModal-TTT'); //get the modal
    var btn = document.getElementById("sumButton-TTT"); //get the button that opens the modal
    var span = document.getElementsByClassName("close-TTT")[0]; //get the <span> element that closes the modal 
    btn.onclick = function() { //when the user clicks the button, open the modal
        modal.style.display = "block";
    }
    span.onclick = function() { //when the user clicks on <span> (x), close the modal
        modal.style.display = "none";
    }
    window.onclick = function(event) { //when the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    //modal for TicTacToe Game Mode Description
    var modal2 = document.getElementById('modeModal-TTT');
    var btn2 = document.getElementById("gameModeButton-TTT"); 
    var span2 = document.getElementsByClassName("close-mode-TTT")[0]; //get the <span> element that closes the modal 
    btn2.onclick = function() { //when the user clicks the button, open the modal
        modal2.style.display = "block";
    }
    span2.onclick = function() { //when the user clicks on <span> (x), close the modal
        modal2.style.display = "none";
    }
    window.onclick = function(event) { //when the user clicks anywhere outside of the modal, close it
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    }
});