var app = angular.module('placemapApp', ['ngRoute','ngCookies']);

app.config(function ($routeProvider) {

    $routeProvider
	    .when('/', 
		    {
		        controller: 'HomeController',
		        templateUrl: 'app/views/view_home.html'
		    })
	    .when('/admin',
	    	{
	    		controller:'AdminController',
	    		templateUrl:'app/views/view_admin.html'
	    	})
	    .when('/studyarea/create',
	    	{
	    		controller:'MapCreateController',
	    		templateUrl:'app/views/view_mapcreate.html'
	    	})
	    .when('/studyarea/',
	    	{
	    		controller:'SASelectController',
	    		templateUrl:'app/views/view_sa_select.html'
	    	})
	    .when('/studyarea/:studyarea_id',
	    	{
	    		controller:'StudyAreaController',
	    		templateUrl:'app/views/view_studyarea.html'
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

$(document).ready(function(){
	window.debug = true;


});
$(window).resize(function(){
	autosize();
});

function autosize(){
	var headerheight=$("header").outerHeight();
	var info_height=$("#info_area").outerHeight();
	var windowheight=$(window).outerHeight();

	var targetheight = windowheight - (headerheight + info_height);


	var namewidth = $(".name_panel h3").width();
	//console.log(namewidth);

	//$(".name_panel").width(namewidth);


	$("#map_canvas").height(targetheight);
}