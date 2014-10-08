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

		$audit_types = $result->result_array();

		$i=0;
		foreach($audit_types as $at){

			$audit_types[$i]["questions"]=$this->getQuestions($at['id']);
			$i++;
		}

		return $audit_types;
	}

	function getQuestions($audit_type_id){
		
		$query = "select 
						q.id as question_id, q.question_text, aqt.type as question_type, atTOq.order
				  from audit_question q  
					inner join audit_question_type aqt on aqt.id=q.fk_question_type_id
					inner join audit_type_TO_question atTOq on atTOq.fk_question_id=q.id
				  where atTOq.fk_audit_type_id=? order by atTOq.order
				";

		$result = $this->db->query($query, array($audit_type_id));

		return $result->result_array();

		//$query = "select "
	}
	

}

?>