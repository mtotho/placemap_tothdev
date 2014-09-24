<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once("application/libraries/REST_Controller.php");

class Participant extends REST_Controller {


	public function index_get(){
		$participant_id = $this->get("id");

		$participant['id']=$participant_id;
		$response['participant']=$participant;

		$this->response($response);

		
	}


	//Logging in
	public function index_post(){
		$this->load->model("participant_model");
		
		$response['participant'] = $this->participant_model->newParticipant();


		$this->response($response);
	}
}