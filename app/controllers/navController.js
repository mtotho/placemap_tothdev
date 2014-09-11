
app.controller('navController', function($scope, api,auth,$location){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	

	function init(){
		
		if(auth.isLoggedIn()){
			$scope.loginlogout="#";
			$scope.userstatus="logout | " + auth.getEmail();	

		}else{

		}

	


	}
	
	init();

	$scope.loginorout = function(){
		if(auth.isLoggedIn()){

			auth.destroySession();
			$scope.userstatus="login";
			$location.path("login");

		}else{
			//console.log("logged");
			$location.path("login");
		}
		
		
	}

	function loadRemoteData(){
		
	}
	function applyStudyArea(){
	
	}

});