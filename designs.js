$(document).ready(function() {

	// set color
	var color = $("#color-picker").val();
	$("#color-picker").change(function() {
		color = $("#color-picker").val();
		$("#paint-icon").css("color", color);
	});

	// create grid
	var height,width;
	$("#create-btn").click(function(event) {
		height = $("#input-height").val();
		width = $("#input-width").val();
		event.preventDefault();
		makeGrid(height,width);
	});
	function makeGrid(height,width) {
		for(var i = 0; i < height; i++) {
			$("#pixel-canvas").append("<tr></tr>");
			for(var j =0; j < width; j++) {
				$("tr").last().append("<td></td>");
			}
		}
		$("#modal-mask").css("display", "block");
	}

	// modal close btn
	$("#close-btn").click(function() {
		$("#modal-mask").css("display", "none");
		$("#pixel-canvas").empty();
	});

	// mouse down paint
	var isMouseDown = false;
	$("body").mousedown(function() {
		isMouseDown = true;
	})
	.mouseup(function() {
		isMouseDown = false;
	});
	$("#pixel-canvas").on("mouseenter","td",function(event) {
		event.preventDefault();
		if(isMouseDown) {
			$(this).css("background-color",color);
		}
	});

	// single click paint
	$("#pixel-canvas").on("mousedown","td", function() {
		$(this).css("background-color",color);
	});

	// height/width increment/decrement
	$("#height-add-btn").click(function() {
		var counter = $("#input-height").val();
		counter++
		$("#input-height").val(counter);
	});
	$("#height-minus-btn").click(function() {
		var counter = $("#input-height").val();
		if (counter > 1) {
			counter--
			$("#input-height").val(counter);
		} 
	});
	$("#width-add-btn").click(function() {
		var counter = $("#input-width").val();
		counter++
		$("#input-width").val(counter);
	});
	$("#width-minus-btn").click(function() {
		var counter = $("#input-width").val();
		if (counter > 1) {
			counter--
			$("#input-width").val(counter);
		} 
	});

});
