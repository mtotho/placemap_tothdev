

app.controller('StudyAreaController', function($scope, api,gmap,$location, $routeParams){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	var studyarea_id=null;
	$scope.studyarea;
	var setMarkerIsClicked = false;
	$scope.participant;
	//$scope.markerType = 'yellow';

	function init(){
		studyarea_id = $routeParams.studyarea_id;

		//debug fake participant info
		$scope.participant = {
			"id":"3",
			"markers_placed":"0"
		};




		//get the study area
		api.getStudyareas(studyarea_id).then(function(response){
			
			var studyarea = response.study_areas[0]
			var placemarkers = studyarea.placemarkers;
			//console.log(response.study_areas[0]);
			gmap.setStudyArea(studyarea);
			gmap.init("map_canvas");
			gmap.loadMarkers(placemarkers);

			applyStudyArea(studyarea);

			gmap.toggleDraggable("grey");

	     	google.maps.event.addListener(gmap.getDraggableMarker(), 'mouseover', function() {
		     
	     		gmap.getDraggableMarker().setAnimation(null);
	 		});

 	     	google.maps.event.addListener(gmap.getDraggableMarker(), 'mouseout', function() {
		     	
		     	if(!setMarkerIsClicked){
	     			gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
			 	}
			 });

			//console.log(response);
		});


		$('#collapsible_content').collapse({
		  toggle: false
		})
		$('#mdlAddMarker').modal({
		  show: false
		})

	
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


	$scope.btnSetRating = function(){

		if(!setMarkerIsClicked){
			setMarkerIsClicked = true;
		
			//$scope.markerType= $("input[name='markerType']:checked").val();
			
			//gmap.toggleDraggable($scope.markerType);
			gmap.lockDraggableMarker(true);

		//	gmap.setDraggableIcon($scope.markerType);
			//gmap.getDraggableMarker().setMap(gmap.getMap());
		//	gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);

			$("#btnSelectMarkerLocation").addClass("active");

			$("#collapsible_content").collapse('show');
		}

	}
	$scope.btnCancelMarkerPlacement = function(){
		setMarkerIsClicked=false;
		//gmap.toggleDraggable();
		gmap.lockDraggableMarker(false);
		$("#collapsible_content").collapse('hide');
		$("#btnSelectMarkerLocation").removeClass("active");
	}
	$scope.btnPlaceMarker = function(){
		

		$("#mdlAddMarker").modal('show');


	

	}
	$scope.rdoColorChange = function(markerType){

		gmap.setDraggableIcon("light-"+$scope.markerType);
		gmap.getDraggableMarker().setMap(gmap.getMap());
		gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
	}


	
	$scope.modalSubmitMarker = function(){

		var pos =  gmap.getDraggableMarker().getPosition();
		var marker={
			"lat":pos.lat(),
			"lng":pos.lng(),
			"study_area_id":studyarea_id,
			"participant_id":-1,
			"icon":$scope.markerType
		}
		var markerDescription = $scope.markerDescription;

		//post marker
		api.postMarker(marker).then(function(response){
			$("#mdlAddMarker").modal('hide');
			$scope.btnCancelMarkerPlacement();
			gmap.loadMarker(response.placemarker);
		});



	}

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});