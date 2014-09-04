//Called instantly
$(function(){

	window.Helper = new Helper();
	window.API = new ApiConnector(window.config['api_path']);
});

//Called after document loads
$(document).ready(function(){
	
});
/*

	//Get the participant id from the cookie
	this.participant_id=window.Helper.readCookie("participant_id");

	window.UI.display_instructions();

	//Check to see if the participant id was a cookie value
	if(window.Helper.isNull(this.participant_id)){
		
		//window.UI.display_instructions();

		//Participant wasn't created, create a new participant in the database and set the id/cookie
		window.API.postParticipant(function(data){
			instance.participant_id=data.participant_id;

			window.Helper.createCookie("participant_id", instance.participant_id, 10);	
		});
	}
*/