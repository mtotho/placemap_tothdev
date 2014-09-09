<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model{
	
	protected $user_query;

	function __construct(){
		parent::__construct();


	}

	function newUser($user){
		
		$salt = substr(hash('sha256', rand(100,5000)),3,10);
	
		$hashpass = hash('sha256', hash('sha256', $user['password']).$salt);

		$query = "insert into user set 
					email= ?,
					hash_pass = ?,
					salt = ?,
					fk_user_type=? ";

		$this->db->query($query, array($user['email'], $hashpass, $salt,$user['user_type']));
		error_log("[POST][User]: ".$this->db->last_query());
		$user_id = $this->db->insert_id();

		$user["id"]=$user_id;

		return $user;

	}

	function login($user){
		$dbuser = $this->getUser($user['email']);
		$salt = $dbuser->salt;
		
		$hashpass = hash('sha256', hash('sha256', $user['password']).$salt);
		$auth_user['email']=$user['email'];


		if($hashpass == $dbuser->hash_pass){

			//create token
			$time = time();

			//raw token - sha256 user salt and current time in seconds
			$raw_token = hash('sha256', $salt.$time);

			//return token - token to be sent back to client. first 6 of raw_token 
			$return_token = substr($raw_token, 0,6);

			//db token - token to be stored in database. first 6 of sha256 hash of return_token and email concatenated
			$db_token = substr(hash('sha256',$return_token.$user['email']),0,6);


			$tomorrow = time() + (24*60*60);
			$token_expire = date("Y-m-d H:i:s",$tomorrow); 

			//update database with with new user token
			$query = "update user set token=?, token_expire=? where email=?";
			$this->db->query($query, array($db_token, $token_expire, $user['email']));

			
			$auth_user['token'] = $return_token;
			$auth_user['user_type']=$dbuser->fk_user_type;
			$auth_user['valid'] =1;
					
		}else{

			$auth_user['valid']=0;
		}
		return $auth_user;	
	}

	function authenticate($user){
		//error_log(print_r($user,true));
		$dbuser = $this->getUser($user['email']);

		$return_token = $user['token'];
		$token_expire = $dbuser->token_expire;
		$token_expire = strtotime($token_expire);

		$auth_user['email']=$user['email'];


		//If current time, in seconds, is less than or equal to the token_expire time, token is not expired
		if(time()<=$token_expire){
			//token not expired
//			error_log("token not expired");
			error_log("return_token:".$return_token);

			$return_token_hash = substr(hash('sha256',$return_token.$user['email']),0,6);

			error_log("return_token_hash:".$return_token_hash);
			if($return_token_hash==$dbuser->token){
				$auth_user['valid']=1;
				$auth_user['user_type']=$dbuser->fk_user_type;
				$auth_user['token']=$return_token;
			}else{
				error_log("hash not equal");
				$auth_user['valid']=0;
				$auth_user['status_code']="BAD";
				$auth_user['status']="Bad token";
			}

		//Token is expired
		}else{
			$auth_user['valid']=0;
			$auth_user['status_code']="EXP";
			$auth_user['status'] = "Token expired";
		}

		return $auth_user;
	}

	function getUser($email){
		$query = "select * from user where email = ?";
		$result = $this->db->query($query, array($email));

		return $result->row();
	}

	function getUsers(){
		$query = "select id, email, fk_user_type as user_type from user";
		$results = $this->db->query($query);
		return $results->result_array();
	}

	function updateUser($user){
		$query = "update user set 
					email = ?,
					fk_user_type=? 
					where id=?";

		$this->db->query($query, array($user['email'],$user['user_type'], $user['id']));

		return $user;
	}
}

?>