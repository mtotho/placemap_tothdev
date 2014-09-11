app.service('auth', function($http, $q, $cookieStore){
	//var user = userService.getUser();

	var url="api/";
	var user;
	var instance = this;

	this.setUser = function setUser(user){
		this.user=user;
	}

	this.isLoggedIn = function isLoggedIn(){
		
		//Attempt to check cookie
		var emailCookie = $cookieStore.get('placemap-email');
		

		//No cookie set, return false
		if(angular.isUndefined(emailCookie)){
			return false;

		//Cookie is set, lets see if token is still valid
		}else{

			var data={
				"email":emailCookie,
				"token":$cookieStore.get('placemap-token')
			}

			user=data;

			return true;
		}//end: else

		//return false;

		/*

		if(angular.isUndefined(user) || user === null){
			return false;
		}else{

			if(user.valid==1){
				return true;
			}else{
				return false;
			}
		}*/
	}//end:isLoggedIn

	this.getEmail = function getEmail(){
		if(this.isLoggedIn()){
			return user.email;
		}
	}

	this.login = function login(user){
		var loginPost = $http.post(url+"login", user);

		return(loginPost.then(handleSuccess, handleError));
	}

	this.register = function register(user){
		var registerPost = $http.post(url+"user", user);

		return(registerPost.then(handleSuccess, handleError));	
	}

	//checks if email&token are still good
	this.authenticate = function authenticate(user){
		var authPost = $http.post(url+"authenticate",user);
		return(authPost.then(handleSuccess, handleError));	
	}

	this.destroySession=function destroySession(){
		$cookieStore.remove("placemap-email");
		$cookieStore.remove("placemap-token");
	}


	function handleError(response){
		console.log(response);
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