app.service('gmap', function($cookieStore){
	var instance = this;
	this.map; //the google map object

	this.draggableMarker;

	this.studyarea_id=0;
	//default map options
	this.defaultCenter = new google.maps.LatLng(44.337689, -72.75613709999999);
	this.mapOptions=new Array();
	this.mapOptions.center = new google.maps.LatLng(44.337689, -72.75613709999999);
	this.mapOptions.zoom = 10;
	this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
	this.mapOptions.draggable=true;
	this.mapOptions.zoomControl=true;
	this.mapOptions.disableDoubleClickZoom=true;
	this.mapOptions.scaleControl=true;
	this.mapOptions.disableDefaultUI=false;
	this.studyarea;
	this.placemarkers = new Object();
	this.mapmarkers = new Array();

	this.icons={
			//"red": "res/images/marker_icon/icon_red.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
			//"yellow":"res/images/marker_icon/icon_yellow.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
			//"green":"res/images/marker_icon/icon_green.png",//"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
			"grey":"res/images/marker_icon/icon_grey.png",
			"light-red": "res/images/marker_icon/icon_red_light.png", 
			"light-yellow":"res/images/marker_icon/icon_yellow_light.png", 
			"light-green":"res/images/marker_icon/icon_green_light.png",
			"red-delete": "res/images/marker_icon/icon_red_delete.png", 
			"yellow-delete":"res/images/marker_icon/icon_yellow_delete.png", 
			"green-delete":"res/images/marker_icon/icon_green_delete.png",
			"red": "res/images/clustering/redCircle-25.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
			"yellow":"res/images/clustering/yellowCircle-25.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
			"green":"res/images/clustering/greenCircle-25.png",//"ht
			"red-select": "res/images/clustering/redCircle-selected-25.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
			"yellow-select":"res/images/clustering/yellowCircle-selected-25.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
			"green-select":"res/images/clustering/greenCircle-selected-25.png",//"ht
		}
 	 this.styles = 
 	 	[
 	 		[
 	 			{
			        url: 'res/images/clustering/greyCircle-30.png?v=1',
			        height: 30,
			        width: 30,
			        anchor: [0, 0],
			        textColor: '#ffffff',
			        textSize: 9
	     		 }, 
	      		{
			        url: 'res/images/clustering/greyCircle-40.png?v=1',
			        height: 40,
			        width: 40,
			        anchor: [0, 0],
			        textColor: '#ffffff',
			        textSize: 11
	     		 }, 
	      		{
			        url: 'res/images/clustering/greyCircle-55.png',
			        height: 55,
			        width: 55,
			        anchor: [0, 0],
			        textColor: '#ffffff',
			        textSize: 12
	      		},
      			{
			        url: 'res/images/clustering/greyCircle-65.png?v=1',
			        height: 65,
			        width: 65,
			        anchor: [0, 0],
			        textColor: '#ffffff',
			        textSize: 13
	      		}
      		], 
      		[
      			{
			        url: '../images/conv30.png',
			        height: 27,
			        width: 30,
			        anchor: [3, 0],
			        textColor: '#ff00ff',
			        textSize: 10
	     		},
     		 	{
			        url: '../images/conv40.png',
			        height: 36,
			        width: 40,
			        anchor: [6, 0],
			        textColor: '#ff0000',
			        textSize: 11
	     	 	}
  			]
  		];
  	

	this.init = function(mapdiv){
			
			//The map variable
			this.map = new google.maps.Map(document.getElementById(mapdiv), this.mapOptions);
			//this.map.setCenter();
			
			this.draggableMarker = new google.maps.Marker({
					    	map: null,
					    	position:this.mapOptions.center,
					    	draggable:true,
					    	animation:google.maps.Animation.BOUNCE,
					    	
		    });

			/*
		     google.maps.event.addListener(this.draggableMarker, 'mouseover', function() {
		     
		     	instance.draggableMarker.setAnimation(null);
 			 });

	 	     google.maps.event.addListener(this.draggableMarker, 'mouseout', function() {
		     	
		     	instance.draggableMarker.setAnimation(google.maps.Animation.BOUNCE);
			 
 			 });
*/
			
		    autosize();
		    this.checkResize();
	}

	this.checkResize = function(){
		google.maps.event.trigger(this.map, 'resize');
		this.map.setCenter(this.mapOptions.center);
	}


	this.enableDraggable = function(bool){
		

		if(bool==true){
			this.draggableMarker.setMap(this.map);
			this.draggableMarker.setPosition(this.mapOptions.center);
		}else{
			this.draggableMarker.setMap(null);
		}
	
	}

	this.getXY = function (latLng) {
		var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
		var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
		var scale = Math.pow(2, this.map.getZoom());
		var worldPoint = this.map.getProjection().fromLatLngToPoint(latLng);
		return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
	}
	this.setDraggableIcon = function(iconColor){
		this.draggableMarker.setIcon(this.icons[iconColor]);
	}
	this.lockDraggableMarker = function(bool){
		this.draggableMarker.setDraggable(!bool);

		if(bool){
			this.draggableMarker.setAnimation(null)
		}else{
			this.draggableMarker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
	this.loadMarkers = function(markers){
		
		
		var clusterMarkers = new Array();

		this.placemarkers = new Array();
		this.mapmarkers = new Array();
		for(var i =0; i<markers.length; i++){
			var tempmarker = this.loadMarker(markers[i]);

			clusterMarkers.push(tempmarker);
			this.placemarkers[markers[i].id]=markers[i];
		}

		var mc = new MarkerClusterer(this.map, clusterMarkers, {
	  		  maxZoom: 19,
	          gridSize: 20,
	          styles: this.styles[0]
		});
	}
	this.loadMarker = function(markerdata){

		var marker = new google.maps.Marker({
					    	map: this.map,
					    	position:new google.maps.LatLng(markerdata.lat, markerdata.lng),
					    	draggable:false,
					    	icon:{"url":this.icons[markerdata.icon], "anchor":new google.maps.Point(12,13)},
					    	//title:markerdata.location_type,
					    	marker_id:markerdata.id

		    });
		   
	   	marker.setClickable(true);
	   	this.mapmarkers.push(marker);
		
	   	return marker;

	    if(markerdata.participant_id==$cookieStore.get("placemap-participant_id")){

	    	
	    	//marker.setIcon(this.icons[markerdata.icon+"-delete"]);
    		
	    }
	}
	this.getIcons = function(){
		return this.icons;
	}
	this.getMapMarkers = function(){
		return this.mapmarkers;
	}
	this.getPlaceMarkers = function(){
		return this.placemarkers;
	}
	this.createStudyArea =  function(){
		this.map.setCenter(this.defaultCenter);
	}

	this.getDraggableMarker = function (){
		return this.draggableMarker;
	}

	this.setStudyArea = function(studyarea){
		this.studyarea=studyarea;
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

