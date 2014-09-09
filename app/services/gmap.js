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

	this.init = function(mapdiv){
			
			//The map variable
			this.map = new google.maps.Map(document.getElementById(mapdiv), this.mapOptions);

			
			this.draggableMarker = new google.maps.Marker({
					    	map: null,
					    	position:this.mapOptions.center,
					    	draggable:true
		    });
	}

	//toggleDraggable(): disables or enables draggable marker. when enabling, sets marker to map center
	this.toggleDraggable=function(){
		
		//Marker is not on a map
		if(window.Helper.isNull(this.draggableMarker.getMap())){
			this.draggableMarker.setMap(this.map);
			this.draggableMarker.setPosition(this.mapOptions.center);

		//Marker already on a map
		}else{
			this.draggableMarker.setMap(null);
		}
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

