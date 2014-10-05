

app.controller('AdminController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	$scope.pages = 
		{ studyarea: 'app/partials/admin_studyarea.html?v=4'};


	function init(){
		$scope.page="studyarea";
		if(!auth.isLoggedIn()){
			$location.path("/login");
		}
	}
	
	init();

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});



app.controller('AdminSAController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		

		$scope.studyareas = new Array();
		$scope.sa_url_part = "http://localhost/placemap_tothdev/main.html#/studyarea/";

		api.getQuestionSets().then(function(response){
				$scope.question_sets = response.question_sets;
				console.log(response);

				api.getStudyareas().then(function(response){

					$scope.studyareas = response.study_areas;

					
					console.log(response);

				});
			});

	}
	
	init();

	$scope.btnNewStudyArea = function(){
		$location.path("studyarea/create");


	}

	function loadRemoteData(){
		
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});