app.directive('ngQuestionAdd', function(api) {
  return {
    restrict: 'E',
    scope:{
    	question_set: '=qs',
        edit_mode: '=edit',
        eid: '='
    },
    link:function(scope, element, attrs){
    	 $('ng-question-add .modal').on('hidden.bs.modal', function (e) {
            if(scope.edit_mode){
                scope.edit_mode=false;
            }
            scope.tempQuestion = new Object();
            $('ng-question-add .collapse').collapse('hide');
            scope.$apply();

            // do something...
        })
    },
    controller:function($scope){
  		
    	
    	function init(){

    		$scope.types={
	    		shortanswer:false,
	    		radio:false,
	    		likert:false,
                check:false
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

    		if(angular.isUndefined($scope.tempQuestion.opts)){
    			$scope.tempQuestion.opts = new Array();
    		}
    		if($scope.newRdoOption!=""){
	    		
	    		var radioOrCheck = {
	    			"option_text":$scope.newRdoOption,
	    			"order":$scope.tempQuestion.opts.length + 1
	    		}
	    		$scope.newRdoOption="";
	    		$scope.tempQuestion.opts.push(radioOrCheck);
	    	
    		}else{
    			alert("Must enter a name for the radio option");
    		}
    	}

        $scope.btnUpdate = function(){
            var tempQuestion = $scope.tempQuestion;
            
            api.updateQuestion({"question":tempQuestion}).then(function(response){
              

              $scope.question_set.questions[response.question.question_id]=response.question;
              console.log(response);
              $("ng-question-add .modal").modal('hide');
            });

        }

    	//Submit question to db
    	$scope.btnSubmit = function(){

    		var tempQuestion = $scope.tempQuestion;

			var data ={
				"question":{
					"question_text":tempQuestion.question_text,
					"question_type":tempQuestion.question_type,
					"order":countProperties($scope.question_set.questions) + 1,
					"question_set_id":$scope.question_set.id
		      }

			}

			if($scope.selQT="radio"){
				data.question.opts=tempQuestion.opts;
			}

			console.log(data);
			api.postQuestion(data).then(function(response){
				$scope.question_set.questions[response.question.question_id]=response.question;


			});
			
			$("ng-question-add .modal").modal('hide');
			
			//$scope.tempQuestion = null;
    	}
        $scope.$watch('edit_mode', function(value){
            if(value){

                angular.copy($scope.question_set.questions[$scope.eid], $scope.tempQuestion)
                //$scope.tempQuestion = $scope.question_set.questions[$scope.eid];
                $scope.selQT = $scope.tempQuestion.question_type;

                if($scope.tempQuestion.jsonOpts == null){
                    $scope.tempQuestion.opts = new Array();
                }else{
                    $scope.tempQuestion.opts=$scope.tempQuestion.jsonOpts;
                }
                

                console.log($scope.tempQuestion);
               //$scope.tempQuestion = 

           }
        });
        $scope.removeOpt = function(index){
            $scope.tempQuestion.opts.splice(index,1);
        }
    	$scope.$watch('tempQuestion.question_type',function(){
    		
    		//hide all of the types
    		for(type in $scope.types){
    			$scope.types[type]=false;
    		}

    		//enable the type that is selected
    		if(!angular.isUndefined($scope.tempQuestion.question_type)){
	    		$scope.types[$scope.tempQuestion.question_type]=true;

	    		$('ng-question-add .collapse').collapse('show');
	    	}
    	});

    	init();

    	function countProperties(obj) {
    		return Object.keys(obj).length;
		}
    },
    //template:'derp'
  	templateUrl:'app/partials/directives/ngQuestionAdd.html?v=2'
  }
});