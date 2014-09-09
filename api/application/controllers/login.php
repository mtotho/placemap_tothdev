<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once("application/libraries/REST_Controller.php");

class Login extends REST_Controller {


	public function index_get(){
		
		
	}


	//Logging in
	public function index_post(){
		$this->load->model("user_model");
		$user = $this->post("user");

		$response['user'] = $this->user_model->login($user);


		$this->response($response);
	}
}