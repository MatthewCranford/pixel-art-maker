$(document).ready(function() {


	// jquery selectors

	// interface
	const $heightInput = $(".interface-input-height"); 
	const $widthInput = $(".interface-input-width");
	const $heightAddBtn = $(".interface-add-btn-height");
	const $heightSubBtn = $(".interface-sub-btn-height");
	const $widthAddBtn = $(".interface-add-btn-width");
	const $widthSubBtn = $(".interface-sub-btn-width");
	const $createBtn = $(".interface-create-btn");
	const $heightTooltip = $(".interface-tooltip-height");
	const $widthTooltip = $(".interface-tooltip-width");
	
	// modal
	const $modal = $(".modal");
	const $pixelCanvasContainer = $(".modal-pixel-canvas-container");
	const $pixelCanvas = $(".modal-pixel-canvas");
	const $closeBtn = 	$(".modal-close-btn");
	const $colorInput = $(".modal-color-input");
	const $paintBtn = $(".modal-paint-btn");
	const $eraseBtn = $(".modal-erase-btn");
	const $clearBtn = $(".modal-clear-btn");
	const $paintTooltip = $(".modal-paint-tooltip");
	const $colorBtn = $(".modal-color-btn");
	const $popup = $(".modal-popup");
	const $popupText = $(".modal-popup-text");
	const $popupYesBtn = $(".modal-popup-yes-btn");
	const $popupNoBtn = $(".modal-popup-no-btn");
	const $iconActive = $(".modal-icon-active");

	

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
		$modal.css("visibility", "visible");
	}

	// holds "current" max height/width of pixel canvas container on user's viewport
	let maxHeight = parseInt(($pixelCanvasContainer.height()/20).toFixed());
	let maxWidth = parseInt(($pixelCanvasContainer.width()/20).toFixed());


	// assign height/width default inputs with max available size
	$heightInput.val(maxHeight).attr("max", maxHeight);
	$widthInput.val(maxWidth).attr("max", maxWidth);


	// reassign height/width inputs when browser resizes
	$(window).resize(function() {
		maxHeight = parseInt(($pixelCanvasContainer.height()/20).toFixed());
		maxWidth = parseInt(($pixelCanvasContainer.width()/20).toFixed());
			
		$heightInput.val(maxHeight).attr("max", maxHeight);
		$widthInput.val(maxWidth).attr("max", maxWidth);	
	})


	// call makeGrid and pass height/width
	$createBtn.on("click keyup",function(e) {
		let code = e.keyCode || e.which;
		let currentHeight = parseInt($heightInput.val());
		let currentWidth = parseInt($widthInput.val());

		// don't submit on tab or space keypress
		if (code === 32 || code === 9 ) {	
			return false;
		}

		else if ((currentHeight <= maxHeight && currentHeight > 0) && (currentWidth <= maxWidth && currentWidth > 0)) {
			e.preventDefault();
			makeGrid(currentHeight,currentWidth);
		} 
	});


	// height +/- interface buttons
	$heightAddBtn.click(function() {
		let counter = $heightInput.val();

		if (counter < maxHeight) {
			$heightTooltip.removeClass("interface-tooltip").text("");
			counter++;
			$heightInput.val(counter);
		}
		else {
			$heightTooltip.addClass("interface-tooltip").text("Max height is " + maxHeight);
		}		
	});

	$heightSubBtn.click(function() {
		let counter = $heightInput.val();

		if (counter > 1) {
			$heightTooltip.removeClass("interface-tooltip").text("");
			counter--;
			$heightInput.val(counter);
		} 
		else {
			$heightTooltip.addClass("interface-tooltip").text("Min height is 1");
		}
	});


	// width +/- interface buttons
	$widthAddBtn.click(function() {
		let counter = $widthInput.val();
		
		if (counter < maxWidth) {
			$widthTooltip.removeClass("interface-tooltip").text("");
			counter++;
			$widthInput.val(counter);
		}
		else {
			$widthTooltip.addClass("interface-tooltip").text("Max width is " + maxWidth);
		}
	});

	$widthSubBtn.click(function() {
		let counter = $widthInput.val();
		
		if (counter > 1) {
			$widthTooltip.removeClass("interface-tooltip").text("");
			counter--
			$widthInput.val(counter);
		} 
		else {
			$widthTooltip.addClass("interface-tooltip").text("Min width is 1");
		}
	});

	// remove interface tooltip on click
	$(".interface-tooltip-height, .interface-tooltip-width").click(function() {
		$(this).removeClass("interface-tooltip").text("");
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

	// init spectrum color picker
	$("#custom").spectrum({
	});
	

	// set color input & set draw to true
	let currentColor = $("#custom").spectrum('get').toHexString();
	$("#custom").change(function() {
		draw=true;
		currentColor = $("#custom").spectrum('get').toHexString();
		$colorBtn.css("color", currentColor);
		$colorBtn.css("border-color", "black");
		$iconActive.removeClass("modal-icon-active");
		$paintBtn.addClass("modal-icon-active");
	});


	// remove "intro" tooltip
	$colorBtn.on("mouseover",function() {
		$colorBtn.find("span").removeClass("modal-paint-tooltip");
		$colorBtn.find("span").addClass("modal-tooltip-text");
		$colorBtn.find("span").text("Change Color");
	})


	// set draw to true
	$paintBtn.click(function() {
		draw=true;
		$(".modal-icon-active").removeClass("modal-icon-active");
		$paintBtn.addClass("modal-icon-active");
	});


	// set draw to false
	$eraseBtn.click(function() {
		draw=false;
		$(".modal-icon-active").removeClass("modal-icon-active");
		$eraseBtn.addClass("modal-icon-active");
	});


	// condition for popup
	let quit = false;

	// close modal icon
	$closeBtn.click(function() {
		quit = true;
		$popupText.text("All progress will be lost. Are you sure?");
		$popup.addClass("is-visible");
		
	});
	

	// clear button popup.
	$clearBtn.click(function() {
		quit = false;
		$popupText.text("Are you sure you want to reset your canvas?");
		$popup.addClass("is-visible");
		
	});


	// popup yes btn
	$popupYesBtn.click(function() {
		if (quit) {
			$modal.css("visibility", "hidden");
			$pixelCanvas.empty();
			$popup.removeClass("is-visible");

			// set draw and color picker back to default color (black)
			currentColor = "#000000";
			$("#custom").spectrum("set", "#000000");
			$colorBtn.css("color", currentColor);
		}

		else {
			$pixelCanvas.find("tr td").css("background-color", "white");
			$popup.removeClass("is-visible");
		}
	});


	// popup no btn
	$popupNoBtn.click(function() {
		$popup.removeClass("is-visible");
	});


});
