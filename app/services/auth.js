app.service('auth', function($http, $q){
	//var user = userService.getUser();

	var url="api/";
	var user;

	this.setUser = function setUser(user){
		this.user=user;
	}

	this.isLoggedIn = function isLoggedIn(){

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