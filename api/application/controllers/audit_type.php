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
		$this->load->model("studyarea_model");

		$study_area = $this->post('study_area');
		error_log(print_r($_POST, true));
		$study_area_id = $this->studyarea_model->postStudyArea($study_area);

		$study_area['id']=$study_area_id;

		$this->response($study_area);
	}
}
