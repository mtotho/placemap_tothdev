

app.controller('HomeController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		console.log("home");
	}
	
	init();

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});