

app.controller('StudyAreaController', function($scope, api,gmap,$location, $routeParams){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	var studyarea_id=null;

	function init(){
		studyarea_id = $routeParams.studyarea_id;

		//get the study area
		$scope.studyareas = api.getStudyareas(studyarea_id).then(function(response){
			
			//console.log(response.study_areas[0]);
			gmap.setStudyArea(response.study_areas[0]);
			gmap.init("map_canvas");

			//console.log(response);
		});


	}
	
	init();

	$scope.markers = [
		{id:1},
		{id:2}
	];

	$scope.zoomChange = function(){
		$scope.map.zoom=parseInt($scope.zoom);

		console.log($scope.map);
	}

	function loadRemoteData(){
		
	}

});