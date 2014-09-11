<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Studyarea_model extends CI_Model{
	
	protected $sa_query;

	function __construct(){
		parent::__construct();

		$this->sa_query="select id, name, lat, lng, zoom, fk_user_id as user_id from study_area sa";
	}

	function getStudyArea($id=null){

		$this->load->model("placemarker_model");
		if($id!=null){
			$query = $this->sa_query." where id=".$this->db->escape($id);
		}else{
			$query = $this->sa_query;
		}
		error_log("[GET][Study_area]: ".$query);
		$results = $this->db->query($query);
		$results = $results->result_array();

		$i=0;
		foreach($results as $sa){
			$sa_id = $sa['id'];

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