<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Placemarker_model extends CI_Model{
	
	protected $marker_query;

	function __construct(){
		parent::__construct();

		$this->marker_query="select pm.id, 
									pm.lat, 
									pm.lng, 
									pm.fk_study_area_id as study_area_id,  
									pm.fk_participant_id as participant_id,
									pm.icon,
									pm.location_type,
									pm.question_1,
									pm.question_2,
									pm.question_3,
									pm.question_4,
									pm.question_5
								from placemarker pm";
	}

	function getPlacemarkers($study_area_id,$participant_id=null){

		//Study area specified but
		
		$this->load->model("studyarea_model");
		//Only build query if markers are visible for this study area
		$query = $this->marker_query." where pm.fk_study_area_id=".$this->db->escape($study_area_id);
		/*
		if($this->studyarea_model->areMarkersVisible($study_area_id)){
			$query = $this->marker_query." where pm.fk_study_area_id=".$this->db->escape($study_area_id);
		
		//if markers aren't visible, we can at least retreive the particular participants markers if participant is specified
		}else if($participant_id!=0){
			$query = $this->marker_query." where pm.fk_study_area_id=".$this->db->escape($study_area_id)." and pm.fk_participant_id=".$this->db->escape($participant_id);
		}
*/
		//error_log("[GET][Placemarkers]: ".$query);
		$results = $this->db->query($query);
		return $results->result_array();
		
	}

	function postPlacemarker($placemarker){
		
		$query = "insert into placemarker set 
					lat  = ?,
					lng  = ?,
					fk_study_area_id = ?,
					fk_participant_id = ?,
					icon=?,
					location_type=?,
					question_1=?,
					question_2=?,
					question_3=?,
					question_4=?,
					question_5=?";
		
		$this->db->query($query, array($placemarker['lat'],$placemarker['lng'],$placemarker['study_area_id'],$placemarker['participant_id'], $placemarker['icon'], $placemarker['location_type'],
			$placemarker['question_1'], $placemarker['question_2'], $placemarker['question_3'], $placemarker['question_4'], $placemarker['question_5']));
		error_log("[POST][Placemarker]: ".$this->db->last_query());
		return $this->db->insert_id();
	
	}
	

}

?>