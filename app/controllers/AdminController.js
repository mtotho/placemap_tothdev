

app.controller('AdminController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	$scope.pages = 
		{ study_areas: 'app/partials/admin_studyarea.html?v=4',
		  users: 'app/partials/admin_users.html'};


	function init(){

		if(!auth.isLoggedIn()){
			$location.path("/login");
		}else{
			//re-authenticate logged in user
			auth.authenticate(auth.getUser()).then(function(response){
				if(response.user.valid==0){
					$location.path("/login");
				}
			});
		}


		

		var location = $location.search().module;
		if(!angular.isUndefined(location)){
			
			$scope.page=location;
		}else{

			$scope.page="study_areas";
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
		$("#admin_nav li:nth-child(1)").addClass("active");
		$("#admin_nav li:nth-child(2)").removeClass("active");
		$("#admin_nav li:nth-child(3)").removeClass("active");
		

		$scope.studyareas = new Array();
		$scope.sa_url_part = "http://localhost/placemap_tothdev/main.html#/studyarea/";

		loadRemoteData();
	}
	
	init();

	$scope.btnNewStudyArea = function(){
		$location.path("studyarea/create");

	}

	function loadRemoteData(){
		api.getStudyareas().then(function(response){

					$scope.studyareas = response.study_areas;

					
					console.log(response);

				});
		
		api.getQuestionSets().then(function(response){
				$scope.question_sets = response.question_sets;
				console.log(response);


			});
	}
	function applyStudyArea(studyarea){
		$scope.studyarea=studyarea;
	}

});

app.controller('AdminUserController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	
	function init(){
		$("#admin_nav li:nth-child(1)").removeClass("active");
		$("#admin_nav li:nth-child(2)").addClass("active");
		$("#admin_nav li:nth-child(3)").removeClass("active");

		//$scope.studyareas = new Array();
		//$scope.sa_url_part = "http://localhost/placemap_tothdev/main.html#/studyarea/";
		$scope.users = new Array();
		loadRemoteData();


		$('#mdlAddUser').modal({
		  show: false
		});
	}
	
	init();

	$scope.btnNewUser = function(){
		
		$("#mdlAddUser").modal('show');
	}
	
	$scope.modalSubmitNewUser = function(){
		if($scope.password1!=$scope.password2){
			alert("Passwords do not match");
		}else{
			var newUser = {
				"email":$scope.newEmail,
				"password":$scope.password1,
				"user_type":"admin"
			}

			auth.register({"user":newUser}).then(function(response){
				var dbuser = response.user;
				$scope.users.push(dbuser);

				$("#mdlAddUser").modal('hide');
				$scope.newEmail="";
				$scope.password1="";
				$scope.password2="";
				
			});
		}
	}
	function loadRemoteData(){
		api.getUsers().then(function(response){
				//$scope.question_sets = response.question_sets;
				console.log(response);
				$scope.users = response.users;


			});
	}
	function applyStudyArea(studyarea){
		
	}

});