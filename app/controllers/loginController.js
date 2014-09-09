app.controller('loginController', function($scope, api, auth, $cookieStore, $location){
	//$scope.array = [];
	var isValid=false;

	//init (optional)
	function init(){
		//$scope.studyareas = api.getStudyareas();

	
		//check cookie
		var emailCookie = $cookieStore.get('placemap-email');
		if(angular.isUndefined(emailCookie)){
			isValid=false;

		}else{
			var user={
				"user":{
					"email":$cookieStore.get('placemap-email'),
					"token":$cookieStore.get('placemap-token')
				}
			};

			//Check to see if cookie credentials are still valid
			auth.authenticate(user)
				.then(
						function(response){
							
							//credentials still good, redirect away from login page
							if(response.user.valid==1){
								$location.path("/");
							}
						}
					);

		}

		var newuser = {
			"user":{
				"email":"mtotho@gmail.com",
				"password":"bernie",
				"user_type":"super_admin"
			}
		}
		//auth.register(newuser);
	}
	
	init();

	$scope.btnLogin_click = function(){
		
		var data={
			"user":{
				"email":$scope.email,
				"password":$scope.password

			}
		}

		auth.login(data)
			.then(
				function(response){
					$cookieStore.put("placemap-email", response.user.email);
					$cookieStore.put("placemap-token", response.user.token);

					$location.path("/");
				}
		);

	}

	function loadRemoteData(){
		
	}

});

app.directive('login-bar',function(){
	console.log("directive called");
	var template="";
	if(!isValid){
		template="<a href=''>login</a>";
	}else{
		template="<a href=''>logout</a>";
	}

	return {
		template:template
	};


});