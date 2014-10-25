
app.controller('navController', function($scope, api,auth,$location){
	//$scope.array = [];
	//$scope.template.url="partials/part_createStudyArea.html";
	//init (optional)
	
	$scope.isLoggedIn = false;

	function init(){
		

	
	}
	


	init();
	$scope.$on('$routeChangeSuccess', function () {
		if(auth.isLoggedIn()){
			$scope.user=auth.getUser();
			$scope.isLoggedIn=true;
		}else{
			$scope.isLoggedIn=false;
		}


		var path=$location.path().split("/")[1];

		$("header .nav li").removeClass("active");
		$scope.userNavText="Admin Panel";

		switch(path){
			case "":{
				
				$("header .nav li:nth-child(1)").addClass("active");
				break;
			}
			case "studyarea":{
				$("header .nav li:nth-child(2)").addClass("active");

				break;
			}
			case "login":{
					
				$("header .nav li:nth-child(3)").addClass("active");
				break;
			}
			case "admin":{
				$scope.userNavText="Logout";
				$("header .nav li:nth-child(4)").addClass("active");

				break;
			}
			default:{
				;
				break;
			}
		}

		console.log(path);

	});
	$scope.logout = function(){
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