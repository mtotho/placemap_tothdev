app.service('api', function($http){
	//var user = userService.getUser();

	var url="api/";
	var studyareas = new Array();

	this.getStudyareas = function(){

		var studyareaGet = $http.get(url+"studyarea");


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

		var postData = new Array();
		postData.study_area=study_area;


		var studyareaPost = $http.post(url+"studyarea", place);
		studyareaPost.success(function(data,status,headers,config){
			console.log(data);
		});
		studyareaPost.error(function(data,status,headers,config){
			console.log(status);
			console.log(headers);
		});
		//post place with user
	}


	function handleError(response){
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