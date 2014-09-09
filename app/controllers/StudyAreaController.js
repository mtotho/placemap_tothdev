

app.controller('StudyAreaController', function($scope, api){
	//$scope.array = [];
	$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	function init(){
		$scope.studyareas = api.getStudyareas();

		$scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 12, draggable:1 };
        $scope.options = {scrollwheel: true};
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