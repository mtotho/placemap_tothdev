<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Placemarker_model extends CI_Model{
	
	protected $marker_query;

	function __construct(){
		parent::__construct();

		$this->marker_query="select pm.id, 
									pm.lat, 
									pm.lng, 
									pm.fk_study_area_id as study_area_id,  
									pm.fk_participant_id as participant_id
									from placemarker pm";
	}

	function getPlacemarkers($study_area_id=null){

		if($study_area_id!=null){
			$query = $this->marker_query." where pm.fk_study_area_id=".$this->db->escape($study_area_id);
		}else{
			$query = $this->marker_query;
		}
		error_log("[GET][Placemarkers]: ".$query);
		$results = $this->db->query($query);

		return $results->result_array();
	}

	function postPlacemarker($placemarker){

		/*
		$query = "insert into study_area set 
					name = ?,
					lat  = ?,
					lng  = ?,
					timestamp = NOW(),
					fk_user_id = ?";
		
		$this->db->query($query, array($studyarea['name'],$studyarea['lat'],$studyarea['lng'],$studyarea['user_id']));
		error_log("[POST][Study_area]: ".$this->db->last_query());
		return $this->db->insert_id();
	*/
	}
	

}

?>