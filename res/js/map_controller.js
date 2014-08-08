/*
	map_controller.js: This is a controller for the main map.html
*/

$(document).ready(function(){

	var mapdiv = "map_canvas";

	window.gmap = new gmap(mapdiv);
	

	$("#btnDebug").click(function(){

		window.gmap.toggleDraggable();

		
		/*window.API.getAllStudyAreas(function(response){
			console.log(response);
		});
		*/
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

		var marker_post = {
			"lat":"43.123123",
			"lng":"34.123123",
			"study_area_id":1,
			"participant_id":1
		}

		var audit_response = {
			"placemarker_id":1,
			"audit_type_id":1,
			"question_responses":[
				{
					"audit_question_id":1,
					"response":"5"
				},
				{
					"audit_question_id":2,
					"response":"4"
				}
			]




		}
		/*window.API.postPlacemarker(marker_post, function(response){
			console.log(response);
		});
		*/
		window.API.getPlacemarkers(1,1, function(response){
			console.log(response);
		});
	});

});

