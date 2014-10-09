

app.controller('AdminController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	$scope.pages = 
		{ study_areas: 'app/partials/admin_studyarea.html?v=4',
		  users: 'app/partials/admin_users.html',
		  questions:'app/partials/admin_questions.html?v=4'};


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

app.controller('AdminQuestionController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	var question_set = new Array();
	
	$scope.questions = new Array();

	function init(){
		$("#admin_nav li:nth-child(1)").removeClass("active");
		$("#admin_nav li:nth-child(2)").removeClass("active");
		$("#admin_nav li:nth-child(3)").addClass("active");

		loadRemoteData();
		//console.log("admin questions");
		$('#mdlAddQuestion').modal({
		  show: false
		});

		$("#question_list").sortable({

			update: function(event,ui){
					var ids = $("#question_list").sortable("toArray",{attribute:"data-qid"})
		  			console.log(ids);
					
					for(var i=0; i<(ids.length); i++){
						
						
						$scope.question_set.questions[ids[i]].order = i+1;
						//$scope.question_set.questions[order-1].order=order
						//console.log("order " + order);
						//console.log("question_id " + ids[order-1]);
					}
					console.log($scope.question_set.questions);
		  			//console.log(question_set);
			}
		});

		$('.collapse').collapse({
		  toggle: false
		});
		
	}
	

	init();
	
	function loadRemoteData(){
		
		api.getQuestionSets().then(function(response){
			$scope.question_sets = response.question_sets;
			

			console.log(response);


			});

	}
	$scope.btnAddQuestion = function(){
		$("#mdlAddQuestion").modal('show');
	}
	$scope.modalAddQuestion = function(){

		var tempQuestion = $scope.tempQuestion;

		var data ={
			"question":{
				"question_text":tempQuestion.text,
				"question_type":"shortanswer",
				"order":countProperties($scope.question_set.questions) + 1,
				"question_set_id":$scope.question_set.id
			}

		}

		api.postQuestion(data).then(function(response){
			$scope.question_set.questions[response.question.question_id]=response.question;


		});
		
		$("#mdlAddQuestion").modal('hide');
		
		$scope.tempQuestion = null;
	}

	$scope.$watch('selQS', function(value){
		
		if(!angular.isUndefined(value)){
			temp_questions = value.questions;
			$scope.question_set = value;

			$scope.question_set.questions = new Object();
			
			//question_set.questions = new Array();

			for(var i=0; i<temp_questions.length; i++){
				$scope.question_set.questions[temp_questions[i].question_id]=temp_questions[i];
			}
			//question_set.questions.length=i;
			console.log($scope.question_set);
			//$scope.questions = question_set.questions;

		
			//$scope.$apply();
			$('.collapse').collapse('show');

		}
		
	});
	function applyStudyArea(studyarea){
		
	}
	function countProperties(obj) {
    return Object.keys(obj).length;
	}

});