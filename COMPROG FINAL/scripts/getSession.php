<?php
	include "init.php";

	$data = json_decode(file_get_contents("php://input"));
	$method = mysql_real_escape_string($data->method);

	if($method == "user"){
		$session = $_SESSION['id'];
		echo $session;
	}




?>