<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Studyarea_model extends CI_Model{
	
	protected $sa_query;

	function __construct(){
		parent::__construct();

		$this->sa_query="select 
							sa.id, sa.name, sa.lat, sa.lng, sa.zoom, at.id as audit_type_id, sa.fk_user_id as user_id 
							
						from study_area sa 
							inner join audit_type at on at.id=sa.default_audit_type  ";
	}

	function getStudyArea($id=null){

		$this->load->model("placemarker_model");
		$this->load->model("audit_model");
		if($id!=null){
			$query = $this->sa_query." where sa.id=".$this->db->escape($id);
		}else{
			$query = $this->sa_query;
		}
		error_log("[GET][Study_area]: ".$query);
		$results = $this->db->query($query);
		$results = $results->result_array();



		//rror_log(print_r($question_set[0],true));
		$i=0;
		foreach($results as $sa){
			$sa_id = $sa['id'];


			$audit_type_id=$sa['audit_type_id'];
			$question_set =$this->audit_model->getAuditTypes($audit_type_id);

			$results[$i]['question_set'] = $question_set[0];


			$results[$i]["placemarkers"] = $this->placemarker_model->getPlacemarkers($sa_id);
			$i++;
		}
		return $results;
	}

	function areMarkersVisible($study_area_id){
		$query = "select display_placemarkers from study_area where id=".$this->db->escape($study_area_id);
		$result = $this->db->query($query);
		$result = $result->row();

		return $result->display_placemarkers;
	}


	function postStudyArea($studyarea){

		$query = "insert into study_area set 
					name = ?,
					lat  = ?,
					lng  = ?,
					zoom = ?,
					timestamp = NOW(),
					fk_user_id = ?";
		
		$this->db->query($query, array($studyarea['name'],$studyarea['lat'],$studyarea['lng'],$studyarea['zoom'],0));
		error_log("[POST][Study_area]: ".$this->db->last_query());
		return $this->db->insert_id();

	}
	

}

?>