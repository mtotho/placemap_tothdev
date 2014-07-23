/*
	map_controller.js: This is a controller for the main map.html
*/

$(document).ready(function(){

	var mapdiv = "map_canvas";

	window.gmap = new gmap(mapdiv);
	

	$("#btnDebug").click(function(){

		window.gmap.toggleDraggable();
		
	});

});

