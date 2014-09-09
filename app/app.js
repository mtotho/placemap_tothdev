var app = angular.module('placemapApp', ['ngRoute','ngCookies','google-maps']);

app.config(function ($routeProvider) {

    $routeProvider
	    .when('/', 
		    {
		        controller: 'MapController',
		        templateUrl: 'app/views/view_main.html'
		    })
	    .when('/studyarea/:studyarea_id',
	    	{
	    		controller:'StudyAreaController',
	    		templateUrl:'app/views/view_studyarea.html'
	    	})
	    .when('/about',
		    {
		      	controller: 'MapController',
		        templateUrl: 'app/views/customers.html'
		    })
		.when('/login',
		    {
		      	controller: 'loginController',
		        templateUrl: 'app/views/view_login.html'
		    }
    	);

});

app.factory('simpleFactory', function(){
	var array = [1,2,3];

	var factory={};

	factory.getArray=function(){
		return array;
	}
	factory.postArray=function(val){
		array.push(val);
	}

	return factory;
});

