$(document).ready(function() {


	// jquery selectors

	const $mainTitle = $(".main-title");

	// interface
	const $interface = $(".interface-container");
	const $input = $(".interface-input"); 
	const $heightInput = $(".interface-input-height"); 
	const $widthInput = $(".interface-input-width");
	const $heightAddBtn = $(".interface-add-btn-height");
	const $heightSubBtn = $(".interface-sub-btn-height");
	const $widthAddBtn = $(".interface-add-btn-width");
	const $widthSubBtn = $(".interface-sub-btn-width");
	const $createBtn = $(".interface-create-btn");
	const $heightTooltip = $(".interface-tooltip-height");
	const $widthTooltip = $(".interface-tooltip-width");
	const $presetSmall = $("#preset-small");
	const $presetMedium = $("#preset-medium");
	const $presetLarge = $("#preset-large");
	const $presetFull = $("#preset-full");
	const $smallDescription = $("#small-description");
	const $mediumDescription = $("#medium-description");
	const $largeDescription = $("#large-description");
	const $fullDescription = $("#full-description");
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
	const $modalNav = $(".modal-nav");
	const $modalToolbar = $(".modal-toolbar");


	// interface Scripts

	// sizes
	let smallHeight;
	let smallWidth;
	let mediumHeight;
	let mediumWidth;
	let largeHeight;
	let largeWidth;
	let maxHeight; 
	let maxWidth;

	/* 
	Create grid using passed parameters. 
	Store rows and cols in memory via tbody.
	Append tbody to the DOM via pixel canvas.
	*/

	// test version @paul 16ms
	function makeGrid(height,width) {
		let tableRows = '';
		let row = 1;
		while (row <= height) {
				tableRows += '<tr>';
				for (let col=1; col <= width; col++) {
						tableRows += '<td></td>';
				}
				tableRows += '</tr>';
				row += 1;
		} // end while loop
		$pixelCanvas.append(tableRows); // add grid to DOM
		$modal.css("visibility", "visible");
	}

	// cache version 34ms
	// function makeGrid(height,width) {
	// 	const $tbody = $("<tbody></tbody>");
	// 	let $tr, $td;
		
	// 	for(let row = 0; row < height; row++) {
	// 		$tr = $("<tr></tr>");
	// 		for(let col =0; col < width; col++) {
	// 			$td = $("<td></td>");
	// 			$tr.append($td);
	// 		}  
	// 		$tbody.append($tr);
	// 	}
	// 	$pixelCanvas.append($tbody);
	// 	$modal.css("visibility", "visible");
	// }

	// // non-cache version 52ms
	// function makeGrid(height,width) {
	// 	let $tr, $td;

	// 	for(let row = 0; row < height; row++) {
	// 		$tr = $("<tr></tr>");
	// 		$pixelCanvas.append($tr);
	// 		for(let col =0; col < width; col++) {
	// 			$td = $("<td></td>");
	// 			$tr.append($td);
	// 		}  
	// 	}
	// 	$modal.css("visibility", "visible");
	// }




	// preset grids

	// small
	$presetSmall.on("click", function() {
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(smallHeight,smallWidth);
	});

	// medium
	$presetMedium.on("click", function() {
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(mediumHeight,mediumWidth);
	});

	// large
	$presetLarge.on("click", function() {
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(largeHeight,largeWidth);
	});

	// full-screen
	$presetFull.on("click", function() {
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(maxHeight,maxWidth);
	});


	// get preset sizes
	function getSize() {
		const tdSize = 20;

		maxHeight = parseInt(($pixelCanvasContainer.height() / tdSize).toFixed());
		maxWidth = parseInt(($pixelCanvasContainer.width() / tdSize).toFixed());
		
		smallHeight = ((maxHeight * .4).toFixed());
		smallWidth = ((maxWidth * .3).toFixed());
		mediumHeight = ((maxHeight * .6).toFixed());
		mediumWidth = ((maxWidth * .4).toFixed());
		largeHeight = ((maxHeight * .8).toFixed());
		largeWidth = ((maxWidth * .6).toFixed());	
	}


	// assign height/width inputs
	function assignSize(height,width) {
		$heightInput.val(height).attr("max", maxHeight);
		$widthInput.val(width).attr("max", maxWidth);
	}


	// update preset dimension text
	function displaySize() {
		$fullDescription.text(maxHeight + "x" + maxWidth);
		$largeDescription.text(largeHeight + "x" + largeWidth);
		$mediumDescription.text(mediumHeight + "x" + mediumWidth);
		$smallDescription.text(smallHeight + "x" + smallWidth);
	}


	// reassign height/width inputs when browser resizes
	$(window).resize(function() {
		getSize();
		displaySize();
	});

	getSize();
	displaySize();



	// call makeGrid and pass height/width
	$createBtn.on("click keyup",function(e) {
		// $pixelCanvas.css("display","block");
		$modalNav.toggleClass("drop-down");
		$modalToolbar.toggleClass("slide-up");
		$pixelCanvas.toggleClass("slide-right");
		// $(".modal-toolbar").css("display","flex");
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
		
			$interface.css("display","none");
			$mainTitle.css("display","none");
		} 
	});


	// select all text field
	$input.on("focus", function() {
		this.select();
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

	

	// set color input & set draw to true
	let currentColor = $("#custom").val();
	$("#custom").change(function() {
		draw=true;
		currentColor = $("#custom").val();
		$colorBtn.css("color", currentColor);
		$colorBtn.css("border-color", "black");
		$iconActive.removeClass("modal-icon-active");
		$paintBtn.addClass("modal-icon-active");
	});


	// remove "intro" tooltip
	$(".modal-color-btn").on("click",function() {
		console.log("Hello");
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
			$interface.css("display","flex");
			$mainTitle.css("display","block");
			$modal.css("visibility", "hidden");
			$modalNav.toggleClass("drop-down");
			$pixelCanvas.toggleClass("slide-right");
			$modalToolbar.toggleClass("slide-up");
			$pixelCanvas.empty();
			$popup.removeClass("is-visible");

			// set draw and color picker back to default color (black)
			currentColor = "#000000";
			$("#custom").spectrum("set", currentColor);
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
