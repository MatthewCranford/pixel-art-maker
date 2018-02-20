$(document).ready(function() {

	// jquery selectors
	const $heightInput = $("#input-height"); 
	const $widthInput = $("#input-width");
	const $createBtn = $(".create-btn");
	const $modal = $(".modal");
	const $colorInput = $(".color-input");
	const $paintBtn = $(".paint-btn");
	const $eraseBtn = $(".erase-btn");
	const $clearBtn = $(".clear-btn");
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
	const $colorBtn = $(".color-btn");



	// ==================
	// Interface Scripts
	// ================== 

	/* 
	Create grid using passed parameters. 
	Store rows and cols in memory via tbody.
	Append tbody to the DOM via pixel canvas.
	*/
	function makeGrid(height,width) {
		const $tbody = $("<tbody></tbody>");
		let $tr, $td;

		for(let row = 0; row < height; row++) {
			$tr = $("<tr></tr>");
			for(let col =0; col < width; col++) {
				$td = $("<td></td>");
				$tr.append($td);
			}  
			$tbody.append($tr);
		}
		$pixelCanvas.append($tbody);
		$modal.css("display", "block");
	}

	// call makeGrid and pass height/width
	$createBtn.click(function(e) {
		let currentHeight = $heightInput.val();
		let currentWidth = $widthInput.val();

		if ((currentHeight <= 30 && currentHeight > 0) && (currentWidth <= 30 && currentWidth > 0)) {
			e.preventDefault();
			makeGrid(currentHeight,currentWidth);
		} 
	});

	// height +/- interface buttons
	$heightAddBtn.click(function() {
		let counter = $heightInput.val();

		if (counter < 30) {
			counter++
			$heightInput.val(counter);
		}
		else {
			alert("Can't go above 30!");
		}
	});
	$heightSubBtn.click(function() {
		let counter = $heightInput.val();
		if (counter > 1) {
			counter--;
			$heightInput.val(counter);
		} 
		else {
			alert("Can't go below 1!");
		}
	});

	// width +/- interface buttons
	$widthAddBtn.click(function() {
		let counter = $widthInput.val();

		if (counter < 30) {
			counter++;
			$widthInput.val(counter);
		}
		else {
			alert("Can't go above 30!");
		}
	});
	$widthSubBtn.click(function() {
		let counter = $widthInput.val();
		
		if (counter > 1) {
			counter--
			$widthInput.val(counter);
		} 
		else {
			alert("Can't go below 1!");
		}
	});

	// ==================
	// Modal Scripts
	// ================== 

	// holds paint/erase state
	let draw = true;

	// draw to canvas while left mouse is down/over "pixel"
	$pixelCanvas.on("mousedown mouseover","td", function(e) {
		e.preventDefault();
		if (draw) {
			if (e.buttons == 1) {
				$(e.target).css("background-color", currentColor);
			}
		}
		else {
			if (e.buttons === 1) {
				$(e.target).css("background-color", "white");
			}	
		}
	});
	
	// set color input & set draw to true
	let currentColor = $colorInput.val();
	$colorInput.change(function() {
		draw=true;
		currentColor = $colorInput.val();
		$colorBtn.css("color", currentColor);
		$colorBtn.css("border-color", "black");
		$(".active-icon").removeClass("active-icon");
		$paintBtn.addClass("active-icon");
	});

	// clear popup
	$colorBtn.on("click mouseover",function() {
		$colorBtn.find("span").removeClass("paint-tooltip");
		$colorBtn.find("span").addClass("tooltip-text");
	})

	// set draw to true
	$paintBtn.click(function() {
		draw=true;
		$(".active-icon").removeClass("active-icon");
		$paintBtn.addClass("active-icon");
	});

	// set draw to false
	$eraseBtn.click(function() {
		draw=false;
		$(".active-icon").removeClass("active-icon");
		$eraseBtn.addClass("active-icon");
	});

	// clear button popup.
	$clearBtn.click(function() {
		$popup.addClass("is-visible");
	});

	$popupYesBtn.click(function() {
		$pixelCanvas.find("tr td").css("background-color", "white");
		$popup.removeClass("is-visible");
	});
	$popupNoBtn.click(function() {
		$popup.removeClass("is-visible");
	});

	// close modal icon
	$closeBtn.click(function() {
		$modal.css("display", "none");
		$pixelCanvas.empty();
	});
	
});
