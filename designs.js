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
	const $closeBtn = 	$("#modal-close-btn");
	const $colorInput = $(".modal-color-input");
	const $paintBtn = $(".modal-paint-btn");
	const $eraseBtn = $(".modal-erase-btn");
	const $dropperBtn = $(".modal-dropper-btn");
	const $clearBtn = $(".modal-clear-btn");
	const $paintTooltip = $(".modal-paint-tooltip");
	const $colorBtn = $(".modal-color-btn");
	const $closePopup = $("#close-popup");
	const $clearPopup = $("#clear-popup");
	const $savePopup = $("#save-popup");
	const $loadPopup = $("#load-popup");
	const $popupText = $(".modal-popup-text");
	const $popupYesBtn = $(".modal-popup-yes-btn");
	const $popupNoBtn = $(".modal-popup-no-btn");
	const $iconActive = $(".modal-icon-active");
	const $modalNav = $(".modal-nav");
	const $modalToolbar = $(".modal-toolbar");
	const $saveBtn = $(".modal-save-btn");
	const $loadBtn = $(".modal-load-btn");
	const $popupCloseBtn = $(".popup-close-btn")

	
	// grid sizes
	let smallHeight;
	let smallWidth;
	let mediumHeight;
	let mediumWidth;
	let largeHeight;
	let largeWidth;
	let maxHeight; 
	let maxWidth;


	// // string concat cache 16ms
	function makeGrid(height,width) {
		$("#pixel-canvas").empty();
		let tableRows = ''; // store string concatenations aka "cache"
		let row = 1;
		while (row <= height) {
				tableRows += '<tr>';
				for (let col=1; col <= width; col++) {
          tableRows += '<td></td>';
				}
				tableRows += '</tr>';
				row += 1;
		} 
		$pixelCanvas.append(tableRows); // add grid to dom
		$modal.css("visibility", "visible");
	}

	// new paul loop (pure vanilla js)
	// 	function makeGrid(height,width) {
	// 		  let grid = document.getElementById('pixel-canvas');
	//     let rows = $("#inputHeight").val();
	//     let columns = $("#inputWidth").val();

	//     while (grid.hasChildNodes()) {
	//       grid.removeChild(grid.lastChild); // delete any previous table rows
	//     }

	// //Build the grid row by row and then append to the table
	// //  project rubrics requires use of for and while loops

	//     let tableRows = '';
	//     let r = 1;
	//     while (r <= height) {
	//         tableRows += '<tr>';
	//         for (let c=1; c <= width; c++) {
	//             tableRows += '<td></td>';
	//         }
	//         tableRows += '</tr>';
	//         r += 1;
	//     } // end while loop
	// 		grid.insertAdjacentHTML('afterbegin', tableRows); // add grid to DOM
	// 		$modal.css("visibility", "visible");
	// 	}

	// cache version 34ms
	// function makeGrid(height,width) {
	// 	let $tbody = $("<tbody></tbody>"); // the "cache"
	// 	let $tr, $td;	
	// 	for(let row = 0; row < height; row++) {
	// 		$tr = $("<tr></tr>");
	// 		for(let col =0; col < width; col++) {
	// 			$td = $("<td></td>");
	// 			$tr.append($td);
	// 		}  
	// 		$tbody.append($tr); 
	// 	}
	// 	$pixelCanvas.append($tbody); // add grid to dom
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
	// }


	// preset grids
	$presetSmall.on("click", function() { // small
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(smallHeight,smallWidth);
	});
	$presetMedium.on("click", function() { // medium
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(mediumHeight,mediumWidth);
	});
	$presetLarge.on("click", function() { // large
		$(".preset-container").removeClass("active");
		$(this).addClass("active");
		assignSize(largeHeight,largeWidth);
	});
	$presetFull.on("click", function() { // full-screen
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

	let gridHeight;
	let gridWidth;


	// call makeGrid and pass height/width
	$("#submitBtn").on("click keyup",function(e) {
		// $pixelCanvas.css("display","block");
		$modalNav.toggleClass("drop-down");
		$modalToolbar.toggleClass("slide-up");
		$pixelCanvas.toggleClass("slide-right");
		// $(".modal-toolbar").css("display","flex");
		let code = e.keyCode || e.which;
		gridHeight = parseInt($heightInput.val());
		gridWidth = parseInt($widthInput.val());

		// don't submit on tab or space keypress
		if (code === 32 || code === 9 ) {	
			return false;
		}

		else if ((gridHeight <= maxHeight && gridHeight > 0) && (gridWidth <= maxWidth && gridWidth > 0)) {

			e.preventDefault();
			makeGrid(gridHeight,gridWidth);
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
	$widthAddBtn.click(function() { // ++
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

	$widthSubBtn.click(function() { // --
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


	// current selected tool
	let tool = {
		"currentTool": ""
	}

	function setTool(newTool) {
		tool["currentTool"] = newTool;
	}
	setTool("draw");
	
	// left mouse button handler
	$pixelCanvas.on("mousedown mouseover","td", function(e) {
		e.preventDefault();
		let currentTool = tool["currentTool"];
		let currentColor = color["currentColor"];
		if (e.buttons === 1) {
			if (currentTool =="draw") {
				$(e.target).css("background-color", currentColor);
			}
			else if (currentTool == "erase") {
				$(e.target).css("background-color", "white");
			}
			else if (currentTool == "dropper") {
				setColor($(e.target).css("background-color"));
				setColorIcon();
			}	
		}		
	});

	// holds paint color
	color = {
		"currentColor": ""
	}

	function setColor(newColor) {
		color["currentColor"] = newColor;
	}
	setColor($("#custom").val()); // initial color value

	function setColorIcon() {
		let currentColor = color["currentColor"];
		$("#color-icon").css("color", currentColor);
		$colorBtn.css("border-color", "black");
	}

	// set new color
	$("#custom").change(function() {
		setColor($("#custom").val());
		setColorIcon();
	});


	// remove "intro" tooltip
	$(".modal-color-btn").on("click",function() {
		$colorBtn.find("span").removeClass("modal-paint-tooltip");
		$colorBtn.find("span").addClass("modal-tooltip-text");
		$colorBtn.find("span").text("Change Color");
	})


	// set draw to true
	$paintBtn.click(function() {
		setTool("draw");
		$(".modal-icon-active").removeClass("modal-icon-active");
		$paintBtn.addClass("modal-icon-active");
	});


	// set draw to false
	$eraseBtn.click(function() {
		setTool("erase");;
		$(".modal-icon-active").removeClass("modal-icon-active");
		$eraseBtn.addClass("modal-icon-active");
	});

	
	$dropperBtn.click(function() {
		setTool("dropper");
		$(".modal-icon-active").removeClass("modal-icon-active");
		$dropperBtn.addClass("modal-icon-active");
	});


	// condition for popup
	let quit = false;

	// modal exit
	$closeBtn.click(function() {
		quit = true;
		$closePopup.addClass("is-visible");
	});


	$popupCloseBtn.click(function() {
		quit = true;
		$(this).parents().removeClass("is-visible");
	});
	

	// clear button popup.
	$clearBtn.click(function() {
		quit = false;
		$clearPopup.addClass("is-visible");
	});


	// save button popup.
	$saveBtn.click(function() {
		$savePopup.addClass("is-visible");
	});


	// save button popup.
	$loadBtn.click(function() {
		$loadPopup.addClass("is-visible");
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
			$closePopup.removeClass("is-visible");
			currentColor = "#000000"; 	// set draw and color picker back to default color (black)
			$("#color-icon").css("color", currentColor);
		}

		else {
			$pixelCanvas.find("tr td").css("background-color", "white");
			$clearPopup.removeClass("is-visible");
		}
	});


	// popup no btn
	$popupNoBtn.click(function() {

		if (quit) {
			$closePopup.removeClass("is-visible");
		}
		else {
			$clearPopup.removeClass("is-visible");
			$savePopup.removeClass("is-visible");
		}
	});

	// save grid
	function saveGrid() {

		let output = {
			tableProperties: {
				"gridHeight": gridHeight,
				"gridWidth": gridWidth
			},
			"rows": [],
		};

		// retrieve col background colors
		$.each($("#pixel-canvas tr"), function(index,value) {
			let cols = {};

			$.each(this.cells, function(subIndex,subValue) {
				cols[subIndex] = $(subValue).css("backgroundColor");	
			});

			output["rows"][index] = cols;
		});

		return JSON.stringify(output,null,"\t"); // return JSON of output
	}


	// download btn submit
	$("#save-grid").submit(function(e) {

		e.preventDefault();
		let output = saveGrid();
		let file = $("#save-file-name").val() + "." + $("#save-file-extension").val();
		let downloadElement = $('<a>')
			.attr("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
			.attr("download", file);

		$("body").append(downloadElement);
		downloadElement[0].click();
	});

	$("#load-file").on("change",function() {

		$("#load-file-content").val(''); // reset content
		let file = $(this)[0].files[0];
		let reader = new FileReader();

		reader.onload = function(e) {
			let content = e.target.result;
			$("#load-file-content").val(content);
		}
		reader.readAsText(file);
	})


	// load btn submit
	$("#load-grid").submit(function(e) {
		e.preventDefault();
	
		if (loadGrid($("#load-file-content").val())) {
			$(this).parents().removeClass("is-visible");
		}
		else {
			alert("error");
		}
	});

	function loadGrid(file) {
		let jsonObject;

		try {
			jsonObject = $.parseJSON(file);
	
		}
		catch(e) {
			// console.log(e);
			return false; // load failure
		}

		gridHeight = jsonObject.tableProperties.gridHeight;
		gridWidth = jsonObject.tableProperties.gridWidth;
		makeGrid(gridHeight,gridWidth);

		// add saved grid's color
		$.each($('#pixel-canvas tr'), function(index,value) {
			$.each(this.cells, function(subIndex,subVal) {
				$(subVal).attr("backgroundColor",jsonObject.rows[index][subIndex]);
				$(subVal).css("background-color",jsonObject.rows[index][subIndex]);
			});
		});
		return true; // load successful
	}
		

});
