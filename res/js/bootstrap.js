//Called instantly
$(function(){

	window.Helper = new Helper();
	window.API = new ApiConnector(window.config['api_path']);
});

//Called after document loads
$(document).ready(function(){
	
});