

app.controller('MapController', function($scope, simpleFactory){
	$scope.array = [];
	
	//init (optional)
	function init(){
		$scope.array = simpleFactory.getArray();

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

});