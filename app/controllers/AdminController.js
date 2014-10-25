

app.controller('AdminController', function($scope, api, auth,$location, $cookieStore, $routeParams){
	var rand = Math.round(Math.random()*1000);
	console.log(rand);

	$scope.pages = 
		{ study_areas: 'app/partials/admin_studyarea.html?v=a'+rand,
		  users: 'app/partials/admin_users.html?v=d'+rand,
		  questions:'app/partials/admin_questions.html?v=21'+rand};


	function init(){
		$("header .nav li").removeClass("active");
		$("header .nav li:nth-child(4)").addClass("active");

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
	
	$scope.updates = new Object();
	
	function init(){
		$("#admin_nav li:nth-child(1)").addClass("active");
		$("#admin_nav li:nth-child(2)").removeClass("active");
		$("#admin_nav li:nth-child(3)").removeClass("active");
		
		$scope.selQuestionSets = new Object();
	

		$scope.studyareas = new Array();

		//Dynamically grab site url for study area link
		var abs_url = $location.absUrl();
		var base_url = abs_url.split("#")[0];

		$scope.sa_url_part = base_url + "#/studyarea/";

		loadRemoteData();
	}
	
	init();

	$scope.btnNewStudyArea = function(){
		$location.path("studyarea/create");

	}

	$scope.qsChange = function(sa_id,index){
		// questionsconsole.log($scope.studyareas[index].question_set);
		//$scope.studyareas[index].question_set.id=$scope.selQuestionSets[sa_id];

	}
	$scope.btnSaveStudyareas = function(){
		console.log($scope.studyareas);
		api.updateStudyareas($scope.studyareas).then(function(response){

			console.log(response);

		});

	}


	function loadRemoteData(){
		api.getQuestionSets().then(function(response){
			$scope.question_sets = response.question_sets;
			console.log(response);


		});

		api.getStudyareas().then(function(response){

					applyStudyAreas(response.study_areas);
					
					console.log($scope.studyareas);

			});
		
	
	}

	function applyStudyAreas(studyareas){


		$scope.studyareas = studyareas;
		//console.lo
		
		//$scope.studyarea=studyarea;
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

app.controller('AdminQuestionController', function($scope, api, auth,$location, $http, $cookieStore, $routeParams, $compile, $templateCache, $sce){
	var question_set = new Array();
	
	$scope.questions = new Array();
	var qt_partials = {
		shortanswer:"app/partials/admin_question_shortanswer.html",
		radio:"app/partials/admin_question_radio.html?v=1"
	}

	function init(){
		$("#admin_nav li:nth-child(1)").removeClass("active");
		$("#admin_nav li:nth-child(2)").removeClass("active");
		$("#admin_nav li:nth-child(3)").addClass("active");

		$scope.edit_question_id = -1;
		$scope.edit_mode = false;	
		loadRemoteData();
		//console.log("admin questions");
	
/*
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
		});*/

		$('.collapse').collapse({
		  toggle: false
		});
		
	}
	

	init();
	
	$scope.editClick = function(qid){
		
		$scope.eid = qid;
		$scope.edit_mode = true;
		$("ng-question-add .modal").modal('show');
	}
	$scope.removeQuestion = function(qid){
		var conf = confirm("Are you sure you would like to delete this question?");
		console.log(qid);
		if(conf){
			api.deleteQuestion(qid).then(function(response){
				//$scope.question_sets = response.question_sets;
					
					delete $scope.question_set.questions[qid];
					console.log(response);


			});
		}
	}

	function loadRemoteData(){
		
		api.getQuestionSets().then(function(response){
			$scope.question_sets = response.question_sets;
			

				console.log(response);


			});

	}
	$scope.btnNewQuestionSet = function(){
		if($scope.newQS!=""){
			var qsname = $scope.newQS;

			var qs = {
				"question_set":{
					"name":qsname
				}
			}

			api.postQuestionSet(qs).then(function(response){

				response.question_set.questions = new Array();
				$scope.question_sets.push(response.question_set);
				loadQuestionSet(response.question_set);
				//console.log(response);
			});

			$scope.newQS="";

		}else{
			alert("Must enter a question set name");
		}
		
	}
	$scope.btnAddQuestion = function(){
		$("ng-question-add .modal").modal('show');
	}
	$scope.modalAddQuestion = function(){

		var tempQuestion = $scope.tempQuestion;



		var data ={
			"question":{
				"question_text":tempQuestion.text,
				"question_type":selQT,
				"order":countProperties($scope.question_set.questions) + 1,
				"question_set_id":$scope.question_set.id
			}

		}

		api.postQuestion(data).then(function(response){
			$scope.question_set.questions[response.question.question_id]=response.question;


		});
		
		$("ng-question-add .modal").modal('hide');
		
		$scope.tempQuestion = null;
	}
	function loadQuestionSet(value){
		var temp_questions = new Array();
		angular.copy(value.questions, temp_questions);
		//temp_questions =  value.questions;
		$scope.question_set = value;

		$scope.question_set.questions = new Object();
		//$scope.question_set.order = new Array();
		
		//question_set.questions = new Array();

		for(var i=0; i<temp_questions.length; i++){
			//$scope.question_set.order[]
			//angular.copy(temp_questions[i], $scope.question_set.questions[temp_questions[i].question_id]);
			$scope.question_set.questions[temp_questions[i].question_id]=temp_questions[i];
		}
		//question_set.questions.length=i;
		console.log($scope.question_set);
		$('#adminQuestionPanel').collapse('show');
	}

	$scope.$watch('selQS', function(value){
		
		if(!angular.isUndefined(value)){
		//	console.log(value);
			loadQuestionSet(value);
			//$scope.questions = question_set.questions;

		
			//$scope.$apply();
			

		}
		
	});


	function applyStudyArea(studyarea){
		
	}
	function countProperties(obj) {
    return Object.keys(obj).length;
	}

});

