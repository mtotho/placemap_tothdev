<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once("application/libraries/REST_Controller.php");

class Api extends REST_Controller {

	public function index_get()
	{
		$data['api_name']="placemap api";
		$data['api_version']="0.1";	
		$data['api_author']="Michael Toth";

		$this->response($data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */