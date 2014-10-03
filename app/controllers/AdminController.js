

app.controller('AdminController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	$scope.pages = 
		{ studyarea: 'app/partials/admin_studyarea.html'};


	function init(){
		if(!auth.isLoggedIn()){
			$location.path("/login");
		}
	}
	
	init();

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});



app.controller('AdminSAController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		console.log("study area controller");
	}
	
	init();

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});