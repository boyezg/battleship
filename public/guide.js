// Function to show the dialog box
function showDialog() {
    document.getElementById('dialog').style.display = 'flex';
   
}

// Function to close the dialog box
function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

//single player exit button function

function callExit(){
    // confirm("Are You Sure To Exit");
    window.location.href = 'http://localhost:3000/index.html';
}