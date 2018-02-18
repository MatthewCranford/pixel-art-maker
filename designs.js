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

	// call makeGrid and pass height/width
	$createBtn.click(e=> {
		e.preventDefault();
		let currentHeight = $heightInput.val();
		let currentWidth = $widthInput.val();
		if ((currentHeight <= 35 && currentHeight > 0) && (currentWidth <= 35 && currentWidth > 0)) {
			makeGrid(currentHeight,currentWidth);
		} 
		else {
			console.log("Bad inputs")
		}
		
	});

	// height +/- interface buttons
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

	// width +/- interface buttons
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

	// holds paint/erase state
	let draw = true;

	// draw to canvas while left mouse is down/over "pixel"
	$pixelCanvas.on("mousedown mouseover","td", e=> {
		e.preventDefault();
		if (draw) {
			if (e.which === 1) {
				$(e.target).css("background-color", currentColor);
			}
		}
		else {
			if (e.which === 1) {
				$(e.target).css("background-color", "white");
			}	
		}
		
	});
	
	// color input
	let currentColor = $colorInput.val();
	$colorInput.change(function() {
	
		currentColor = $colorInput.val();
		$colorBtn.css("color", currentColor);
	});

	// clear popup
	$colorBtn.click(function() {
		$paintTooltip.css("display", "none");
	})

	// set draw to true
	$paintBtn.click(function() {
		draw=true;
		$(".active-icon").removeClass("active-icon");
		$paintBtn.find(".toolbar-icon").addClass("active-icon");
	});

	// set draw to false
	$eraseBtn.click(function() {
		draw=false;
		$(".active-icon").removeClass("active-icon");
		$eraseBtn.find(".toolbar-icon").addClass("active-icon");
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
