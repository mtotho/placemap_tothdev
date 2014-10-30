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
									pm.icon
								from placemarker pm 
									inner join audit_response ar on ar.fk_placemarker_id=pm.id";
	}

	function getPlacemarkers($study_area_id, $audit_type_id,$participant_id=null){
		$this->load->model("audit_model");
		//Study area specified but
		
		$this->load->model("studyarea_model");
		//Only build query if markers are visible for this study area
		$query = $this->marker_query." where pm.fk_study_area_id=".$this->db->escape($study_area_id)." and ar.fk_audit_type_id=".$this->db->escape($audit_type_id);
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

		$results = $results->result_array();
		$i=0;
		foreach($results as $marker){

			$results[$i]['response'] = $this->audit_model->getResponse($marker['id']);
			$i++;
		}


		return $results;
		
	}

	
	function getPlacemarkersByDistance($study_area_id, $distance){

		//$


	}


	function clusterMarkers($study_area_id){


		/*for($placemarkers as $m){

		}*/

	}

	function postPlacemarker($placemarker){
		
		$query = "insert into placemarker set 
					lat  = ?,
					lng  = ?,
					fk_study_area_id = ?,
					fk_participant_id = ?,
					icon=?";
		
		$this->db->query($query, array($placemarker['lat'],$placemarker['lng'],$placemarker['study_area_id'],$placemarker['participant_id'], $placemarker['icon']));
		error_log("[POST][Placemarker]: ".$this->db->last_query());
		return $this->db->insert_id();
	
	}
	

}

?>