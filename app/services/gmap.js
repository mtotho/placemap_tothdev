app.service('gmap', function(){
	var instance = this;
	this.map; //the google map object

	this.draggableMarker;

	this.studyarea_id=0;
	//default map options
	this.mapOptions=new Array();
	this.mapOptions.center = new google.maps.LatLng(44.337689, -72.75613709999999);
	this.mapOptions.zoom = 10;
	this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
	this.mapOptions.draggable=true;
	this.mapOptions.zoomControl=true;
	this.mapOptions.disableDoubleClickZoom=false;
	this.mapOptions.scaleControl=true;

	this.placemarkers = new Array();

	this.icons={
			"red":"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
			"yellow":"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
			"green":"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
		}

	this.init = function(mapdiv){
			
			//The map variable
			this.map = new google.maps.Map(document.getElementById(mapdiv), this.mapOptions);

			
			this.draggableMarker = new google.maps.Marker({
					    	map: null,
					    	position:this.mapOptions.center,
					    	draggable:true
		    });

		    autosize();
	}

	//toggleDraggable(): disables or enables draggable marker. when enabling, sets marker to map center
	this.toggleDraggable=function(iconColor){
		if(iconColor==null){
			iconColor="red";
		}

		//Marker is not on a map
		if(this.draggableMarker.getMap()==null){
			this.draggableMarker.setMap(this.map);
			this.draggableMarker.setPosition(this.mapOptions.center);
			this.draggableMarker.setIcon(this.icons[iconColor]);

		//Marker already on a map
		}else{
			this.draggableMarker.setMap(null);
		}
	}
	this.loadMarkers = function(markers){

		for(var i =0; i<markers.length; i++){
			this.loadMarker(markers[i]);
		}
	}
	this.loadMarker = function(marker){
		var marker = new google.maps.Marker({
					    	map: this.map,
					    	position:new google.maps.LatLng(marker.lat, marker.lng),
					    	draggable:false,
					    	icon:this.icons[marker.icon]
	    });
	}

	this.getDraggableMarker = function (){
		return this.draggableMarker;
	}

	this.setStudyArea = function(studyarea){
		console.log(studyarea);
		this.mapOptions.center = new google.maps.LatLng(studyarea.lat, studyarea.lng);
		this.mapOptions.zoom = parseInt(studyarea.zoom);
	}
	this.getMap = function(){
		return this.map;
	}

	this.getZoom = function(){
		return this.map.getZoom();
	}

	this.getCenter = function(){
		return this.map.getCenter();
	}

});

