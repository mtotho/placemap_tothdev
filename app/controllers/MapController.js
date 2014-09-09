

app.controller('MapController', function($scope, api,auth, $location){
	//$scope.array = [];
	
	$scope.panel_partial="app/partials/part_createStudyArea.html";

	$scope.studyareas = new Array();

	//init (optional)
	function init(){
		//check if logged in
		if(!auth.isLoggedIn()){
			$location.path("/login");
		}
		

		$scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 12, draggable:1 };
        $scope.options = {scrollwheel: true};

        loadRemoteData();
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
		api.getStudyareas().then(
						function(response){
							applyStudyAreas(response.study_areas);
						}
					);
	}

	function applyStudyAreas(studyareas){
		$scope.studyareas = studyareas;
	}

});	