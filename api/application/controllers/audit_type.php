<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Audit_type extends REST_Controller {

	public function index_get(){
		$this->load->model("audit_model");

		//$studyarea_id = $this->get("id");

		$audit_types = $this->audit_model->getAuditTypes();

		$response['question_sets']=$audit_types;
		$this->response($response);
	}


	public function index_post(){
		$this->load->model("audit_model");

		$audit_type = $this->post('question_set');
		$user = $this->post('user');
		$audit_type = $this->audit_model->postAuditType($audit_type,$user);

		$response['question_set']=$audit_type;

		$this->response($response);
	}
}
