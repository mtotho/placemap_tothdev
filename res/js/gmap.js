function gmap(div){
	this.instance = this;

	this.mapdiv=div; //the div to store map
	this.map; //the google map object

	this.draggableMarker;

	//default map options
	this.mapOptions=new Array();
	this.mapOptions.center = new google.maps.LatLng(44.337689, -72.75613709999999);
	this.mapOptions.zoom = 10;
	this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
	this.mapOptions.draggable=true;
	this.mapOptions.zoomControl=true;
	this.mapOptions.disableDoubleClickZoom=false;
	this.mapOptions.scaleControl=true;

	//Initialize map 
	this.initialize();
}
gmap.prototype.initialize=function initialize(){
		
		//The map variable
		this.map = new google.maps.Map(document.getElementById(this.mapdiv), this.mapOptions);

		
		this.draggableMarker = new google.maps.Marker({
				    	map: null,
				    	position:this.mapOptions.center,
				    	draggable:true
	    });
}

//toggleDraggable(): disables or enables draggable marker. when enabling, sets marker to map center
gmap.prototype.toggleDraggable = function toggleDraggable(){
	
	//Marker is not on a map
	if(window.Helper.isNull(this.draggableMarker.getMap())){
		this.draggableMarker.setMap(this.map);
		this.draggableMarker.setPosition(this.mapOptions.center);

	//Marker already on a map
	}else{
		this.draggableMarker.setMap(null);
	}
}