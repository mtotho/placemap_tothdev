<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Placemarker extends REST_Controller {

	public function index_get(){
		$this->load->model("placemarker_model");

		$study_area_id = $this->get("study_area_id");

		if($study_area_id==""){
			$study_area_id=null;
		}

		$placemarkers = $this->placemarker_model->getPlacemarkers($study_area_id);

		$response['placemarkers']=$placemarkers;
		$this->response($response);
	}

	public function index_post(){
		$this->load->model("placemarker_model");


		$this->response($study_area);
	}
}
