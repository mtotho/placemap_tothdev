<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Studyarea extends REST_Controller {

	public function index_get(){
		$this->load->model("studyarea_model");

		$studyarea_id = $this->get("id");

		if($studyarea_id==""){
			$studyarea_id=null;
		}

		$study_areas = $this->studyarea_model->getStudyArea($studyarea_id);

		$response['study_areas']=$study_areas;
		
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
