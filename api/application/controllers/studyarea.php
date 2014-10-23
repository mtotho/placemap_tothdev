<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Studyarea extends REST_Controller {

	public function index_get(){
		$this->load->model("studyarea_model");

		$studyarea_id = $this->get("id");
		$is_public = $this->get("public");



		if($studyarea_id==""){
			$studyarea_id=null;
		}

		if($is_public == ""){
			$is_public=null;
		}

		$study_areas = $this->studyarea_model->getStudyArea($studyarea_id, $is_public);

		$response['study_areas']=$study_areas;

		//error_log(print_r($response,true));
		
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

	public function index_put(){
		$this->load->model("studyarea_model");

		$study_areas = $this->put('study_areas');

		foreach($study_areas as $sa){
			$this->studyarea_model->updateStudyArea($sa);
		}
		$response['study_areas']=$study_areas;
		$this->response($response);
		
	}
}
