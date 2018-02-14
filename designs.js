$(document).ready(function() {

	// DOM selectors using jQuery.
	const $heightInput = $("#input-height"); 
	const $widthInput = $("#input-width");
	const $createBtn = $(".create-btn");
	const $modal = $(".modal");
	const $colorInput = $(".color-input");
	const $paintIcon = 	$(".paint-container");
	const $clearIcon = $(".clear-container");
	const $popup = $(".popup");
	const $popupYesBtn = $(".popup-yes-btn");
	const $popupNoBtn = $(".popup-no-btn");
	const $pixelCanvas = $(".pixel-canvas");
	const $closeBtn = 	$(".close-btn");	
	const $heightAddBtn = $("#height-add-btn");
	const $heightSubBtn = $("#height-sub-btn");
	const $widthAddBtn = $("#width-add-btn");
	const $widthSubBtn = $("#width-sub-btn");


	// ============
	// Interface 
	// ============ 

	// Create grid. 
	function makeGrid(height,width) {
		for(var i = 0; i < height; i++) {
		$pixelCanvas.append("<tr></tr>");
			for(var j =0; j < width; j++) {
				$("tr").last().append("<td></td>");
			}
		}
		$modal.css("display", "block");
	}

	// Create button handler.
	$createBtn.click(e=> {
		e.preventDefault();
		let currentHeight = $heightInput.val();
		let currentWidth = $widthInput.val();
		if (currentHeight <= 35 && currentWidth <= 35) {
			makeGrid(currentHeight,currentWidth);
		} 
		else {
			console.log("toooo BIG!!!")
		}
		
	});

	// Height +/- interface buttons.
	$heightAddBtn.click(function() {
		let counter = $heightInput.val();
		counter++
		$heightInput.val(counter);
	});
	$heightSubBtn.click(function() {
		let counter = $heightInput.val();
		if (counter > 1) {
			counter--
			$heightInput.val(counter);
		} 
	});

	// Width +/- interface buttons.
	$widthAddBtn.click(function() {
		let counter = $widthInput.val();
		counter++
		$widthInput.val(counter);
	});
	$widthSubBtn.click(function() {
		let counter = $widthInput.val();
		if (counter > 1) {
			counter--
			$widthInput.val(counter);
		} 
	});

	// ============
	// Grid Modal 
	// ============ 

	// Draw to canvas while left mouse is down/over "pixel".
	$pixelCanvas.on("mousedown mouseover","td", e=> {
		e.preventDefault();
		if (e.which === 1) {
			$(e.target).css("background-color", currentColor);
		}
	});
	
	// Paint brush color input.
	let currentColor = $colorInput.val();
	$colorInput.change(function() {
		currentColor = $colorInput.val();
		$paintIcon.css("color", currentColor);
	});

	// Clear button popup.
	$clearIcon.click(function() {
		$popup.addClass("is-visible");
	});
	$popupYesBtn.click(function() {
		$pixelCanvas.find("tr td").css("background-color", "white");
		$popup.removeClass("is-visible");
	});
	$popupNoBtn.click(function() {
		$popup.removeClass("is-visible");
	});

	// Close modal icon.
	$closeBtn.click(function() {
		$modal.css("display", "none");
		$pixelCanvas.empty();
	});

});
