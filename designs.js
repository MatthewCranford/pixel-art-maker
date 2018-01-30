$(document).ready(function() {

    // Select color input
    var color = $("#colorPicker").val()
    console.log(color);

    $("#colorPicker").change(function() {
        color = $("#colorPicker").val();
        console.log(color);
    })
    
    // Select size input
    var height = $("#inputHeight").val();
    var weight = $("#inputWeight").val();
 
    // When size is submitted by the user, call makeGrid()
    $("#sizePicker").submit(function(event) {
        event.preventDefault();
        console.log(height,weight);
        makeGrid();
    })
    function makeGrid() {
    // Your code goes here!
    
    }
    
});
