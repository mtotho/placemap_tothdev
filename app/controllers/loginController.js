app.controller('loginController', function($scope, api, auth, $cookieStore, $location){
	//$scope.array = [];
	//var isValid=false;

	//init (optional)
	function init(){
		
		//check cookie
		//var emailCookie = $cookieStore.get('placemap-email');

		//Check cookie
		if(auth.isLoggedIn()){

			//cookie set, authenticate user before displaying login
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
							auth.setUser(response.user);
							//credentials still good, redirect away from login page
							if(response.user.valid==1){
								$location.path("/");
							}
						}
					);
		
		}else{
			

		}

		//debug register user
		var newuser = {
			"user":{
				"email":"mtotho@gmail.com",
				"password":"bernie",
				"user_type":"super_admin"
			}
		}
		//auth.register(newuser);
	
	}//end: init();

	
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
					auth.setUser(response.user);
					$cookieStore.put("placemap-email", response.user.email);
					$cookieStore.put("placemap-token", response.user.token);

					$location.path("/");
				}
		);

	}

	function loadRemoteData(){
		
	}

});

/*
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


});*/
/*
app.controller('authController',function($scope, api, auth, $cookieStore, $location){
	//$scope.array = [];
	var isValid=false;

/*
	//init (optional)
	function init(){
		
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
							auth.setUser(response.user);
							console.log(response);
							//credentials still good, redirect away from login page
							if(response.user.valid==1){
								//$location.path("/");
							}
						}
					);

		}

		
	
	}//end: init();*/

	
	//init();

	/*function loadRemoteData(){
		
	}

});*/