

app.controller('StudyAreaController', function($scope, api,gmap, auth,$location, $cookieStore, $routeParams){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	var studyarea_id=null;
	$scope.studyarea;
	var setMarkerIsClicked = false;
	$scope.participant;
	$scope.participant_marker_count;
	//$scope.markerType = 'yellow';
	var question_page_index = 1;
	var question_page_div = new Array();
	var placemarkers = new Array();
	var initState = true;
	$scope.marker;

	function init(){
		$scope.qvopen=false;
		//$scope.initial_state=true;
		//make the rate select button disabled
		$("#btnSelectMarkerLocation").addClass("disabled");
		$("#btnConfirmLocation").addClass("disabled");
		$scope.participant = {
			"id":"3",
			"markers_placed":"0"
		};

		if(angular.isUndefined($cookieStore.get("placemap-participant_marker_count"))){
			$scope.participant.markers_placed=0;
			$cookieStore.put("placemap-participant_marker_count",0);
		}else{	
			$scope.participant.markers_placed = $cookieStore.get("placemap-participant_marker_count");
		}

		studyarea_id = $routeParams.studyarea_id;

		//debug fake participant info
	

		//get the current participant
		auth.getParticipant().then(function(response){
			$scope.participant.id=response.participant.id;
			$cookieStore.put("placemap-participant_id", $scope.participant.id);
		});
		console.log($scope.participant);



		//get the study area
		api.getStudyareas(studyarea_id).then(function(response){
			
			var studyarea = response.study_areas[0]
			var placemarkers = studyarea.placemarkers;
			console.log(placemarkers);
			//console.log(response);
			//console.log(response.study_areas[0]);
			gmap.setStudyArea(studyarea);
			gmap.init("map_canvas");
			gmap.loadMarkers(placemarkers);
			gmap.checkResize();
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


 	     	var mapmarkers = gmap.getMapMarkers();
 	     	placemarkers = gmap.getPlaceMarkers();

 	     	for(var i=0; i<mapmarkers.length; i++){
 	     		var marker = mapmarkers[i];

	 			google.maps.event.addListener(marker, 'click', function() {
				     $(".response_panel").collapse("hide");
				     var marker_id=marker.marker_id;

				     var dbmarker = placemarkers[marker_id];
				     console.log(dbmarker);
				   	  applyResponsePanel(dbmarker);
				     
				      $(".response_panel").collapse("show");

			     	//gmap.getDraggableMarker().setAnimation(null);
				});
 	     	}
			//console.log(response);
		});


		$('.collapse').collapse({
		  toggle: false
		});
		
		$('#mdlAddMarker').modal({
		  show: false
		});



	
	}
	
	init();
	function applyResponsePanel(marker){
		$scope.response_marker = marker;
		$scope.$apply();
	}

	$scope.zoomChange = function(){
		$scope.map.zoom=parseInt($scope.zoom);

		
		console.log($scope.map);
	}
	$scope.btnNextPage = function(){
		question_page_index++;

		$("#question_panel .collapse:nth-child("+(question_page_index-1)+")").collapse('hide');
		$("#question_panel .collapse:nth-child("+question_page_index+")").collapse('show');

		//$("#collapsible_content").collapse('hide');
			//expand collapsible content
		//$("#collapsible_content2").collapse('show');
	}
	$scope.btnLastPage = function(){
		question_page_index--;

		$("#question_panel .collapse:nth-child("+(question_page_index+1)+")").collapse('hide');
		$("#question_panel .collapse:nth-child("+question_page_index+")").collapse('show');

		//$("#collapsible_content").collapse('hide');
			//expand collapsible content
		//$("#collapsible_content2").collapse('show');
	}

	$scope.$watch('participant.markers_placed', function(value){
		if(value==1000){
			//console.log(value);
			///gmap.toggleDraggable();
			//$("input[name='markerType']").addClass("disabled");
		}
	})
	//Confirm rating/Temporation location
	$scope.btnSetRating = function(){
		//if($scope.participant.markers_placed==15){
		//	alert("You have already placed 15 markers");
			//return;
		//}

		//Don't allow button click if it's already clicked or no maarker rating is defined
		if(!setMarkerIsClicked && $scope.markerType!="undefined"){
			//flag so we know button is clicked
			setMarkerIsClicked = true;
			
			//indicate button is pressed
			$("#btnSelectMarkerLocation").addClass("active");

			//lock the draggable marker into place (and stop the bouncing)
			gmap.lockDraggableMarker(true);

			//expand collapsible content
			//$("ng-questions-view .collapse:nth-child(1)").collapse('show');
			//$("ng-questions-view .modal").modal('show');
			initState=false;
			
			
			var pos =  gmap.getDraggableMarker().getPosition();
			$scope.marker={
				"lat":pos.lat(),
				"lng":pos.lng(),
				"study_area_id":studyarea_id,
				"participant_id":$scope.participant.id,
				"icon":$scope.markerType
			}

			$scope.qvopen=true;

		}

	}
	 $scope.$watch('qvopen', function(enabled){
	 		
	 		
        if(!enabled && !initState){
        	$scope.btnCancelMarkerPlacement();
        }
    });

	$scope.btnDebug = function(){
		//$cookieStore.remove("placemap-participant_id");
		//$cookieStore.remove("placemap-participant_marker_count");
		//location.reload();

		//expand collapsible content
			
	}

	//Cancel the the marker rating and location lock
	$scope.btnCancelMarkerPlacement = function(){
		//reflag the button as not clicked
		setMarkerIsClicked=false;

		question_page_index=1;
		$scope.question_1="";
		$scope.question_2="";
		$scope.question_3="";
		$scope.question_4="";
		$scope.question_5="";
		
		//unlock draggable marker and continue bounce
		gmap.lockDraggableMarker(false);

		//set the draggable icon color back to default
		gmap.setDraggableIcon("grey");
		$scope.markerType=null;
		//remove indication button is clicked
		$("#btnSelectMarkerLocation").removeClass("active");
		//redisable  button 
		$("#btnSelectMarkerLocation").addClass("disabled");

		//Replace the draggable marker on the map (it seems to disapear from the map when you change icon)
		gmap.getDraggableMarker().setMap(gmap.getMap());

		//undo location type selection
		$scope.locationType=null;

		//redisable confirm button
		$("#btnConfirmLocation").addClass("disabled");


		//hide collapsible content
		$(".collapse").collapse('hide');
	}

	//confirm location - post data
	$scope.btnPlaceMarker = function(){
		
		if($scope.locationType!="undefined"){
			


		


			//var markerDescription = $scope.markerDescription;
			console.log(marker);
			//post marker
			
		}
		



		//$("#mdlAddMarker").modal('show');
	}

	//Change event handler for marker rating change
	$scope.rdoColorChange = function(markerType){
		
		if($scope.markerType!="undefined"){
			console.log($scope.markerType);
			//set the draggable icon color
			gmap.setDraggableIcon("light-"+$scope.markerType);

			//Replace the draggable marker on the map (it seems to disapear from the map when you change icon)
			gmap.getDraggableMarker().setMap(gmap.getMap());

			//set the animation to bounce to the user can see where it is placed.
			gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);



			switch($scope.markerType){
				case "red":{
					$scope.rating_description = "a detriment";
					break;
				}
				case "yellow":{
					$scope.rating_description = "an opportunity";
					break;
				}
				case "green":{
					$scope.rating_description = "an asset";
					break;
				}
			}

			$("#btnSelectMarkerLocation").removeClass("disabled");
		}
	}
	$scope.rdoLocationTypeChange = function(locationType){
		$("#btnConfirmLocation").removeClass("disabled");
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