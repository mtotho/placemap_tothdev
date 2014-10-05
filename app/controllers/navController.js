
app.controller('navController', function($scope, api,auth,$location){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	

	function init(){
		
		if(auth.isLoggedIn()){
			$scope.loginlogout="#";
			$scope.userstatus="logout | " + auth.getEmail();	

		}else{
			$scope.userstatus="login";
		}

	


	}
	
	init();

	$scope.loginorout = function(){
		if(!angular.isUndefined(auth.getUser())){

			auth.destroySession();
			$scope.userstatus="login";
			$location.path("/login");

		}else{
			
			$location.path("/login");
		}
		
		
	}

	function loadRemoteData(){
		
	}
	function applyStudyArea(){
	
	}

});