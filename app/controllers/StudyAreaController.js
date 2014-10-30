

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
	var selectedMarker;
	var selectedDBMarker;
	$scope.marker;
	$scope.responseShown= false;
	var markerZindex=100;

	function init(){
		$("header .nav li").removeClass("active");
		$("header .nav li:nth-child(2)").addClass("active");
		
		//Flag the question view panel closed initially.
		$scope.qvopen=false;
		
		//Set the study area id to the value in the url parameter
		studyarea_id = $routeParams.studyarea_id;



		//make the rate select button disabled
		$("#btnSelectMarkerLocation").addClass("disabled");
		$("#btnConfirmLocation").addClass("disabled");
		$scope.participant = {
			"id":"3",
			"markers_placed":"0"
		};

		//Check marker count cookie - rework this system
		if(angular.isUndefined($cookieStore.get("placemap-participant_marker_count"))){
			$scope.participant.markers_placed=0;
			$cookieStore.put("placemap-participant_marker_count",0);
		}else{	
			$scope.participant.markers_placed = $cookieStore.get("placemap-participant_marker_count");
		}


		//get the current participant
		auth.getParticipant().then(function(response){
			$scope.participant.id=response.participant.id;
			$cookieStore.put("placemap-participant_id", $scope.participant.id);
		});

		if(window.debug)console.log("===Participant===");
		if(window.debug)console.log($scope.participant);
		if(window.debug)console.log(" ");

		//get the study area
		api.getStudyareas(studyarea_id).then(function(response){
			
			if(window.debug)console.log("===Studyarea===");
			if(window.debug)console.log(response);
			if(window.debug)console.log(" ");
			var studyarea = response.study_areas[0]
			var placemarkers = studyarea.placemarkers;
			
			
			
			//set up google map and load placemarkers
			gmap.setStudyArea(studyarea);
			gmap.init("map_canvas");
			gmap.loadMarkers(placemarkers);
			gmap.checkResize();
			applyStudyArea(studyarea);

			gmap.toggleDraggable("grey");

			//Stop draggable marker from bouncing on mouseover
	     	google.maps.event.addListener(gmap.getDraggableMarker(), 'mouseover', function() {
	     		gmap.getDraggableMarker().setAnimation(null);
	 		});

	     	//Start draggable marker bounce upon mouseout
 	     	google.maps.event.addListener(gmap.getDraggableMarker(), 'mouseout', function() {
		     	if(!setMarkerIsClicked){ //We do not want to animate marker if the user has locked in a location to rate
	     			gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
			 	}
			 });

 	     	//Map click event
			google.maps.event.addListener(gmap.getMap(), 'click', function(event) {
		     	$("#rating_panel").removeClass("opaque");

		     	gmap.getDraggableMarker().setPosition(event.latLng);
		     	gmap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
		     	//If there is a marker selected (for viewing responses) unselect that marker (change the icon back to default)
		     	if(!angular.isUndefined(selectedMarker)){
				   			selectedMarker.setIcon({"url":gmap.getIcons()[selectedDBMarker.icon], "anchor":new google.maps.Point(12,13)});
			   		}
			   	//Hide the response panel
			   	$scope.$apply(function(){
	     			hideResponse();
	     		});
	 		});

 	     	var mapmarkers = gmap.getMapMarkers(); //Map markers are the actual google maps marker objects
 	     	placemarkers = gmap.getPlaceMarkers(); //placemap markers
 	   		
 	   		//Loop through all the google map marker objects and add click event
 	     	for(var i=0; i<mapmarkers.length; i++){
 	     		var marker = mapmarkers[i];

	 			google.maps.event.addListener(marker, 'click', function() {
				   	
				   	//ONLY show response if not currently rating
				   	if(!setMarkerIsClicked){
				   		$("#rating_panel").addClass("opaque");
				   		this.setZIndex(markerZindex);
				   		markerZindex++;
				   		$scope.btnCancelMarkerPlacement();
				   		//If another marker has already been selected, revert that marker's icon back to normal 
				   		if(!angular.isUndefined(selectedMarker)){
				   			selectedMarker.setIcon({"url":gmap.getIcons()[selectedDBMarker.icon], "anchor":new google.maps.Point(12,13)});
				   		}
				   		//Set the selected marker to be this current one we just clicked
				   		selectedMarker=this;

				   		//Grab the database marker 'placemap marker' object associated with this google map marker 
				     	var marker_id=this.marker_id;
				     	var dbmarker = placemarkers[marker_id];

				     	//set the selected DB marker for use elsewhere
				   		selectedDBMarker = dbmarker;

				   		//apply dbmarker data to the scope
				   	  	applyResponsePanel(dbmarker);

				   	  	//set the icon of the selected marker to a noticeably different one so we can distinguish
				   	  	this.setIcon({"url":gmap.getIcons()[dbmarker.icon+"-select"], "anchor":new google.maps.Point(12,13)});
				   	  	
				   	  	if(window.debug)console.log("===Marker Clicked===");
				   	  	if(window.debug)console.log(dbmarker);
					    if(window.debug)console.log(" ");

				      	$(".response_panel").collapse("show");
				      	$scope.$apply(function(){
				      		$scope.responseShown=true;
				      	});
				      	

				  	}
			    
				});//end marker click
 	     	}//end for
			
		});//end massive bloated studyarea pull .then function


		$('.collapse').collapse({
		  toggle: false
		});
		
		$('#mdlAddMarker').modal({
		  show: false
		});	
	}//end: init()
	init();

	function hideResponse(){
		$(".response_panel").collapse("hide");

      	
 			$scope.responseShown = false;
 		
	}
	function applyResponsePanel(marker){
		$scope.response_marker = marker;
		$scope.$apply();
	}

	$scope.$watch('participant.markers_placed', function(value){
		if(value==1000){
			//console.log(value);
			///gmap.toggleDraggable();
			//$("input[name='markerType']").addClass("disabled");
		}
	});

	//Confirm rating/Temporation location
	$scope.btnSetRating = function(){
		//if($scope.participant.markers_placed==15){
		//	alert("You have already placed 15 markers");
			//return;
		//}

		//Don't allow button click if it's already clicked or no maarker rating is defined
		if(!setMarkerIsClicked && $scope.markerType!="undefined"){
			//flag so we know this button is clicked
			setMarkerIsClicked = true;

			//indicate button is pressed
			$("#btnSelectMarkerLocation").addClass("active");

			//Hide any response panels showing 
			$(".response_panel").collapse("hide");
			
			//lock the draggable marker into place (and stop the bouncing)
			gmap.lockDraggableMarker(true);

			//flag initState false - hack to make sure watch function doesnt run right away (watch qvopen)
			initState=false;
			
			//define marker so we can post it to db should user go through with questions
			var pos =  gmap.getDraggableMarker().getPosition();
			$scope.marker={
				"lat":pos.lat(),
				"lng":pos.lng(),
				"study_area_id":studyarea_id,
				"participant_id":$scope.participant.id,
				"icon":$scope.markerType
			}

			//flag qvopen to true to show the questions view
			$scope.qvopen=true;
		}

	}

	//watch 'qvopen' change to decide whether to cancemarker placement
	$scope.$watch('qvopen', function(enabled){
		
		//Cancel marker placement if question view is hidden
        if(!enabled && !initState){
        	$scope.btnCancelMarkerPlacement();
        }
    });

	//Cancel the the marker rating and location lock
	$scope.btnCancelMarkerPlacement = function(){
		//reflag the button as not clicked
		setMarkerIsClicked=false;

		//unlock draggable marker and continue bounce
		gmap.lockDraggableMarker(false);

		//set the draggable icon color back to default
		gmap.setDraggableIcon("grey");
	  	$scope.markerType=null;
		
		//Replace the draggable marker on the map (it seems to disapear from the map when you change icon)
		gmap.getDraggableMarker().setMap(gmap.getMap());

		//remove indication button is clicked
		$("#btnSelectMarkerLocation").removeClass("active");
		
		//redisable  button 
		$("#btnSelectMarkerLocation").addClass("disabled");

		//redisable confirm button
		$("#btnConfirmLocation").addClass("disabled");

		//undo location type selection
		$scope.locationType=null;

		//hide collapsible content
		//$(".collapse").collapse('hide');
	}


	//Change event handler for marker rating change
	$scope.rdoColorChange = function(markerType){
		
		if($scope.markerType!="undefined"){
			hideResponse();
			$("#rating_panel").removeClass("opaque");
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

	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;

	}

});