<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Question extends REST_Controller {

	public function index_get(){
		$this->load->model("audit_model");

		//$studyarea_id = $this->get("id");

		//$audit_types = $this->audit_model->getAuditTypes();

		//$response['question_sets']=$audit_types;
		$this->response($response);
	}


	public function index_post(){
		$this->load->model("audit_model");

		$user = $this->post('user');

		$question = $this->post('question');

		$response['question'] = $this->audit_model->newQuestion($question);
		
		$this->response($response);
	}
}
