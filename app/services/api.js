app.service('api', function($http, $q){
	//var user = userService.getUser();

	var url="api/";
	var studyareas = new Array();

	this.getStudyareas = function(id){

		var studyareaGet = $http.get(url+"studyarea?id="+id);


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