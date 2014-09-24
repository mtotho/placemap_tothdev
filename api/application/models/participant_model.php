<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Participant_model extends CI_Model{
	
	function __construct(){
		parent::__construct();


	}

	function newParticipant(){
		$query = "insert into participant set 
					ip=?,
					fk_user_id=?";
		$this->db->query($query, array(0,0));

		$data['id']=$this->db->insert_id();

		return $data;
	}

}

?>