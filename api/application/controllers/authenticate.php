<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once("application/libraries/REST_Controller.php");

class Authenticate extends REST_Controller {


	public function index_get(){
		
		
	}

	//validate credentials
	public function index_post(){
		$this->load->model("user_model");
		$user = $this->post("user");

		$response['user'] = $this->user_model->authenticate($user);

		$this->response($response);
	}
}