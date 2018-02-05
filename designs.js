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
    $("#create-btn").click(function(event) {
        var height = $("#inputHeight").val();
        var width = $("#inputWidth").val();
        event.preventDefault();
        if ($("#pixelCanvas tr").length < 1) {
            makeGrid(height,width);
        }
        else if ($("#pixelCanvas tr").length < height) {
            console.log("working!");
            addHeight(height,width);
        }
        else if ($("#pixelCanvas tr td").length < width) {
            addWidth(height,width);
        }
        
    });

    $("#clear-btn").click(function(event) {
        $("#pixelCanvas").empty();
        event.preventDefault();
    });

    function makeGrid(height,width) {
        // Your code goes here!

        for(var i = 0; i < height; i++) {
            $("#pixelCanvas").append("<tr></tr>");
            for(var j = 0; j < width; j++) {
                $("tr").last().append("<td></td>"); 
            }
        }            
    }

    function addHeight(height,width) {
        for(var i = $("#pixelCanvas tr").length; i < height; i++) {
            $("#pixelCanvas").append("<tr></tr>");
            for(var j = 0; j < width; j++) {
                $("tr").last().append("<td></td>"); 
            }
        }
    }

    function addWidth(height,width) {
        for(var i = 0; i < height; i++) {
            console.log("working");
            for(var j = $("#pixelCanvas tr td").length; j < width; j++) {
                $("tr").last().append("<td></td>"); 
            }
        }
    }


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
