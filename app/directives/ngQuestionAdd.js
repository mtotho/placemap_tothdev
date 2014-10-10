app.directive('ngQuestionAdd', function(api) {
  return {
    restrict: 'E',
    scope:{
    	question_set: '=qs'
    },
    link:function(scope, element, attrs){
    	//element.click(function(){
		//});
    },
    controller:function($scope){
  		
    	
    	function init(){
    		$scope.types={
	    		shortanswer:false,
	    		radio:false,
	    		likert:false
			}
	    	$scope.tempQuestion = new Object();
    		
    		$('ng-question-add .collapse').collapse({
			  toggle: false
			});

			$('ng-question-add .modal').modal({
			  show: false
			});
    	}

    	$scope.btnAddRdoOption = function(){

    		if(angular.isUndefined($scope.tempQuestion.radios)){
    			$scope.tempQuestion.radios = new Array();
    		}
    		if($scope.newRdoOption!=""){
	    		
	    		var radio = {
	    			"radio_text":$scope.newRdoOption,
	    			"order":$scope.tempQuestion.radios.length + 1
	    		}
	    		$scope.newRdoOption="";
	    		$scope.tempQuestion.radios.push(radio);
	    	
    		}else{
    			alert("Must enter a name for the radio option");
    		}
    	}

    	//Submit question to db
    	$scope.btnSubmit = function(){

    		var tempQuestion = $scope.tempQuestion;

			var data ={
				"question":{
					"question_text":tempQuestion.question_text,
					"question_type":$scope.selQT,
					"order":countProperties($scope.question_set.questions) + 1,
					"question_set_id":$scope.question_set.id
				}

			}

			if($scope.selQT="radio"){
				data.question.radios=tempQuestion.radios;
			}

			console.log(data);
			api.postQuestion(data).then(function(response){
				$scope.question_set.questions[response.question.question_id]=response.question;


			});
			
			$("ng-question-add .modal").modal('hide');
			
			$scope.tempQuestion = null;
    	}


    	$scope.$watch('selQT',function(){
    		
    		//hide all of the types
    		for(type in $scope.types){
    			$scope.types[type]=false;
    		}

    		//enable the type that is selected
    		if(!angular.isUndefined($scope.selQT)){
	    		$scope.types[$scope.selQT]=true;

	    		$('ng-question-add .collapse').collapse('show');
	    	}
    	});

    	init();

    	function countProperties(obj) {
    		return Object.keys(obj).length;
		}
    },
    //template:'derp'
  	templateUrl:'app/partials/directives/ngQuestionAdd.html'
  }
});