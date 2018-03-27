<?php

	$data = json_decode(file_get_contents("php://input"));
	$method = mysql_real_escape_string($data->method);
	if($method == "logout"){
		session_start();
		session_destroy("id");
		session_commit();	
	}
	else{
		session_start();
		session_destroy("cart");
		session_commit();
	}
?>