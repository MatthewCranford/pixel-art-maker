$(document).ready(function() {

    // Select color input
    var color = $("#colorPicker").val()
    console.log(color);

    $("#colorPicker").change(function() {
        color = $("#colorPicker").val();
        console.log(color);
    })
    
    // Select size input
   
    // When size is submitted by the user, call makeGrid()
    $("#sizePicker").submit(function(event) {
        $("#pixelCanvas").empty();
        var height = $("#inputHeight").val();
        var width = $("#inputWidth").val();
        event.preventDefault();
        makeGrid(height,width);
    })
    function makeGrid(row,data) {
        // Your code goes here!
        console.log(typeof row);
        console.log(row);
        for(var i = 0; i < row; i++) {
            $("#pixelCanvas").append("<tr></tr>");
            console.log(i);
            for(var j = 0; j < data; j++) {
                $("tr").last().append("<td></td>"); 
            }
        }
                
    }
    console.log(isMouseDown);
    var isMouseDown = false;

    $("body").mousedown(function() {
        isMouseDown = true;
        console.log(isMouseDown)
    })
    .mouseup(function() {
        isMouseDown = false;
        console.log(isMouseDown);
    });
    
    $("#pixelCanvas").on("mousedown","td", function() {
        $(this).css("background-color",color);
    });

    $("#pixelCanvas").on("mouseenter","td",function(event) {
        console.log("!");
        event.preventDefault();
        if(isMouseDown) {
            $(this).css("background-color",color);
        }
    });      
   
});
