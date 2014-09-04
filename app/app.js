var app = angular.module('placemapApp', ['ngRoute','google-maps']);

app.config(function ($routeProvider) {

    $routeProvider
	    .when('/', 
		    {
		        controller: 'MapController',
		        templateUrl: 'app/views/view_main.html'
		    })
	    .when('/about',
		    {
		      	controller: 'MapController',
		        templateUrl: 'app/views/customers.html'
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

