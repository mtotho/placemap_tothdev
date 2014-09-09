

app.controller('MapController', function($scope, api,auth,gmap, $location){
	//$scope.array = [];
	//$scope.panel_partial="app/partials/part_createStudyArea.html";

	$scope.studyareas = new Array();
	//$scope.googleMap={}

	//init (optional)
	function init(){
		//check if logged in
		if(!auth.isLoggedIn()){
			$location.path("/login");
		}
		

		/*$scope.map = {
			center: {latitude: 52.219053, longitude: 4.404418 }, 
			zoom: 12, 
			draggable:"true", 
			dragging:true
		};
*/
		gmap.init("map_canvas")
      //  $scope.options = {scrollwheel: false};

        
        //loadRemoteData();
	}
	
	init();


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

	function applyMapZoom(zoom){
		$scope.mapzoom = zoom;
	}

	//Map zoom change
	google.maps.event.addListener(gmap.getMap(), 'zoom_changed', function() {

    	applyMapZoom(gmap.getZoom());
  
  });

	$scope.btnCreateStudyArea = function(){

		var study_area={
			name:$scope.StudyAreaName,
			zoom:gmap.getZoom(),
			lat:gmap.getCenter().lat(),
			lng:gmap.getCenter().lng()
		}

		api.insertStudyarea($scope.StudyAreaName,gmap.getCenter().lat(),gmap.getCenter().lng(), gmap.getZoom()).then(
						function(response){
							console.log(response);
						}
					);;
		

	}

});	