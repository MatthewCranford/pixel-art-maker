$(document).ready(function() {

	var height,width;



	// Select color input
	var color = $("#color-picker").val()
	console.log(color);

	$("#color-picker").change(function() {
		color = $("#color-picker").val();
		console.log(color);
	})

	

	// When size is submitted by the user, call makeGrid()
	$("#create-btn").click(function(event) {
		// Select size input
		height = $("#input-height").val();
		width = $("#input-width").val();
		event.preventDefault();
	
		makeGrid(height,width);
	

	});

	$("#clear-btn").click(function(event) {
		$("#pixel-canvas").empty();
		event.preventDefault();
	});

	function makeGrid(height,width) {
		// Your code goes here!

		$("#pixel-canvas").append("<tr></tr>");
		for(var i = 0; i < height; i++) {
		
			for(var j =0; j < width; j++) {
				$("tr").last().append("<td></td>");
			}
			$("#pixel-canvas").append("<tr></tr>");
		}

	

		$("#modal-mask").css("display", "block");
	}

	$("#close").click(function() {
		$("#modal-mask").css("display", "none");
		$("#pixel-canvas").empty();
	});

	// function addHeight(height,width) {
	// 	for(var i = $("#pixel-canvas tr").length; i < height; i++) {
	// 	  $("#pixel-canvas").append("<tr></tr>");
	// 	  for(var j = 0; j < width; j++) {
	// 			$("tr").last().append("<td></td>");
	// 	  }
	// 	}
	// }

	// function addWidth(height,width) {
	// 	// for(var i = $("#pixel-canvas tr").length; i < height; i++) {
	// 	// 	for(var j = $("#pixel-canvas tr td").length; j < width; j++) {
			
	// 			$("tr").each(function() {
	// 				$(this).append("<td></td>");
	// 			})
	// 		}
	// 	}
	// }



	var isMouseDown = false;

	$("body").mousedown(function() {
		isMouseDown = true;
		// console.log(isMouseDown)
	})
	.mouseup(function() {
		isMouseDown = false;
		// console.log(isMouseDown);
	});

	$("#pixel-canvas").on("mousedown","td", function() {
		$(this).css("background-color",color);
	});

	$("#pixel-canvas").on("mouseenter","td",function(event) {
		// console.log("!");
		event.preventDefault();
		if(isMouseDown) {
			$(this).css("background-color",color);
		}
	});

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
