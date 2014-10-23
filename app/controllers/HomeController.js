

app.controller('HomeController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		$("header .nav li").removeClass("active");
		$("header .nav li:nth-child(1)").addClass("active");
	}
	
	init();

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});