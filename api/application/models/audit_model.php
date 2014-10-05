<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Audit_model extends CI_Model{
	
	protected $audit_query;

	function __construct(){
		parent::__construct();

		$this->audit_query="";
	}

	function getAuditTypes(){
		$query = "select at.id, at.name, at.description from audit_type at";

		$result=$this->db->query($query);

		return $result->result_array();
	}
	

}

?>