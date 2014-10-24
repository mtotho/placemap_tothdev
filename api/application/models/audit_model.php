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
				  where atTOq.fk_audit_type_id=? and q.is_deleted=0 order by atTOq.order
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
	function updateQuestion($question){
		$query = "update audit_question set 
					question_text = ?,
					fk_question_type_id= (select qt.id from audit_question_type qt where type=?),
					jsonOpts=?
				  where id=?";
		$this->db->query($query, array($question['question_text'], $question['question_type'], json_encode($question['opts']), $question['question_id']));

		return $question;
	}
	function removeQuestion($qid){
		//$query = "delete from audit_type_TO_question where fk_question_id=?";
		//$this->db->query($query, array($qid));

		$query = "update audit_question set is_deleted = 1 where id=".$this->db->escape($qid);
		$this->db->query($query);
		error_log($this->db->last_query());

		$response['message']="success";
		return $response;
	}

	function getResponse($marker_id){
		$query = "select r.id as response_id, r.timestamp, atq.fk_audit_question_id as question_id, atq.response_text, at.type as question_type, atq.response_json
					from audit_response r
				  inner join audit_response_TO_question atq on atq.fk_audit_response_id=r.id
				  inner join audit_question q on q.id=atq.fk_audit_question_id
				  inner join audit_question_type at on at.id=q.fk_question_type_id
				  inner join audit_type_TO_question attq on attq.fk_question_id=q.id
				   where r.fk_placemarker_id=? order by attq.order ";
		$results = $this->db->query($query, array($marker_id));
		$results = $results->result_array();

		$i=0;
		foreach($results as $response){
			if($response['question_type']!="shortanswer"){

				$results[$i]['response_json']=json_decode($results[$i]['response_json']);
			}
			$i++;
		}

		return $results;

	}
	function postAuditType($audit_type, $user){
		$this->load->model('user_model');
		$query = "insert into audit_type set 
					name = ?,
					description = 'derp',
					fk_user_id=? ";
		$this->db->query($query, array($audit_type['name'], $this->user_model->getUser($user['email'])->id));
		$audit_type['id']=$this->db->insert_id();
		return $audit_type;
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