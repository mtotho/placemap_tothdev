app.controller('SASelectController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		$("header .nav li").removeClass("active");
		$("header .nav li:nth-child(2").addClass("active");

		var abs_url = $location.absUrl();
		var base_url = abs_url.split("#")[0];

		$scope.sa_url_part = base_url + "#/studyarea/";

			loadRemoteData();
	}
	
	init();

	function loadRemoteData(){
		api.getPublicStudyareas().then(function(response){

					applyStudyAreas(response.study_areas);
					
					console.log($scope.studyareas);

			});
		
	}
	function applyStudyAreas(studyareas){
		$scope.studyareas=studyareas;
	}

});