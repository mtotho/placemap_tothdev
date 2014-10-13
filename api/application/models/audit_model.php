<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Audit_model extends CI_Model{
	
	protected $audit_query;

	function __construct(){
		parent::__construct();

		$this->audit_query="";
	}

	function getAuditTypes($id=null){
		$query = "select at.id, at.name, at.description from audit_type at";

		if($id!=null){
			$query.=" where at.id=".$id;
		}

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
						q.id as question_id, q.question_text, q.jsonOpts, aqt.type as question_type, atTOq.order
				  from audit_question q  
					inner join audit_question_type aqt on aqt.id=q.fk_question_type_id
					inner join audit_type_TO_question atTOq on atTOq.fk_question_id=q.id
				  where atTOq.fk_audit_type_id=? order by atTOq.order
				";

		$results = $this->db->query($query, array($audit_type_id));
		$results = $results->result_array();

		
		$i=0;
		foreach($results as $question){
			if(!($question['jsonOpts']=="" || $question['jsonOpts']==null)){

				$results[$i]['jsonOpts']=json_decode($results[$i]['jsonOpts']);
			}
			$i++;
		}
		return $results;

		//$query = "select "
	}

	function newQuestion($question){

		$query = "insert into audit_question set 
					question_text = ?, fk_question_type_id= (select qt.id from audit_question_type qt where type=?) ";
		if($question['question_type']!="shortanswer"){
			$query.=", jsonOpts=?";

			$this->db->query($query, array($question['question_text'], $question['question_type'], json_encode($question['opts'])));
		}else{
			$this->db->query($query, array($question['question_text'], $question['question_type']));
		}
		

		$question_id = $this->db->insert_id();

		$query2= "insert into audit_type_TO_question set 
					fk_question_id = ?, fk_audit_type_id=?, `order` = ?";
		$this->db->query($query2, array($question_id, $question['question_set_id'], $question['order']));

		unset($question['question_set_id']);
		$question['question_id']=$question_id;

		return $question;

	}


	function postResponse($response){

		$query1 = "insert into audit_response set 
						timestamp=NOW(),
						fk_placemarker_id=?,
						fk_audit_type_id=?";
		$this->db->query($query1, array($response['marker']['id'], $response['question_set']['id']));

		$response_id = $this->db->insert_id();

		foreach($response['responses'] as $re){
			$query2 = "insert into audit_response_TO_question set 
						fk_audit_response_id=?,
						fk_audit_question_id=?,";
							error_log($re['question_id']);


			if($re["question_type"]=="shortanswer"){
				$query2.=" response_text = ?";
				$this->db->query($query2, array($response_id, $re['question_id'], $re['text']));
			}else{
				$query2.=" response_json = ?";
				$this->db->query($query2, array($response_id, $re['question_id'], json_encode($re['opts'])));
			}
			

		}

		return $response;
	}
	

}

?>