/*
	map_controller.js: This is a controller for the main map.html
*/

$(document).ready(function(){

	var mapdiv = "map_canvas";

	window.gmap = new gmap(mapdiv);
	

	$("#btnDebug").click(function(){

		window.gmap.toggleDraggable();

		
		window.API.getAllStudyAreas(function(response){
			console.log(response);
		});

		/*
		var study_area = {
			"name":"test area 2",
			"lat": "test lat 2",
			"lng": "test lng 2",
			"user_id":0

		};
		window.API.postStudyArea(study_area, function(response){
			console.log(response);
		})
		*/
	});

});

