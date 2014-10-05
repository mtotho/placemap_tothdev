app.service('api', function($http, $q, auth){
	//var user = userService.getUser();

	var url="api/";
	var studyareas = new Array();

	this.getStudyareas = function(id){

		if(angular.isUndefined(id)){
			var studyareaGet = $http.get(url+"studyarea");
		}else{
			var studyareaGet = $http.get(url+"studyarea?id="+id);
		}
		


		return studyareaGet.then(handleSuccess, handleError);
	}

	this.insertStudyarea = function(name, lat,lng,zoom){
		var study_area = {
			name:name,
			lat:lat,
			lng:lng,
			zoom:zoom
		}

		studyareas.push(study_area);

		var postData = {
			"study_area":study_area
		}
		
		var studyareaPost = $http.post(url+"studyarea", postData);
		return studyareaPost.then(handleSuccess, handleError);
	
	}

	this.getQuestionSets = function(){
		var get = $http.get(url+"audit_type");
		return get.then(handleSuccess, handleError);
	}
	this.getUsers = function(){
		var user = auth.getUser();

		var get = $http.get(url+"user?auth_email="+user.email+"&auth_token="+user.token);
		return get.then(handleSuccess, handleError);	
	}

	this.postMarker = function(marker){
		var postData={
			"placemarker":marker
		}
		var markerPost = $http.post(url+"placemarker", postData);
		return markerPost.then(handleSuccess, handleError);
	}


	function handleError(response){
		console.log(response);
		if(
			!angular.isObject(response.data) || 
			!response.data.message
		){
			return($q.reject("An unknown error occured"));
		}
		return($q.reject(response.data.message));
		
	}

	function handleSuccess(response){
		return(response.data);
	}



});