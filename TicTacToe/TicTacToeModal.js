/*
Created by Catherine Rodriquez
*/

$(document).ready(function() {
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