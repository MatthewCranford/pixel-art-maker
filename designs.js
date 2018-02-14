$(document).ready(function() {

	// DOM selectors using colQuery.
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
	const $heightAddBtn = $(".height-add-btn");
	const $heightSubBtn = $(".height-sub-btn");
	const $widthAddBtn = $(".width-add-btn");
	const $widthSubBtn = $(".width-sub-btn");
	const $paintTooltip = $(".paint-tooltip");

	// ==================
	// Interface Scripts
	// ================== 

	/* 
	Create grid using passed parameters 
	Store rows and cols in memory via tbody
	Append tbody to the DOM via pixel canvas
	*/
	function makeGrid(height,width) {
		const $tbody = $("<tbody></tbody>");

		for(let row = 0; row < height; row++) {
			let $tr = $("<tr></tr>");
			for(let col =0; col < width; col++) {
				let $td = $("<td></td>")
				$tr.append($td);
			}  
			$tbody.append($tr);
		}
		$pixelCanvas.append($tbody);
		$modal.css("display", "block");
	}

	// call makeGrid and pass height/width.
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

	// height +/- interface buttons.
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

	// width +/- interface buttons.
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

	// ==================
	// Modal Scripts
	// ================== 

	// draw to canvas while left mouse is down/over "pixel".
	$pixelCanvas.on("mousedown mouseover","td", e=> {
		e.preventDefault();
		if (e.which === 1) {
			$(e.target).css("background-color", currentColor);
		}
	});
	
	// paint brush color input.
	let currentColor = $colorInput.val();
	$colorInput.change(function() {
		currentColor = $colorInput.val();
		$paintIcon.css("color", currentColor);
	});

	$paintTooltip.click(function() {
		$(this).css("display", "none");
	})

	// clear button popup.
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

	// close modal icon.
	$closeBtn.click(function() {
		$modal.css("display", "none");
		$pixelCanvas.empty();
	});

});
