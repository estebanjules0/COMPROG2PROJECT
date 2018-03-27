<?php
	include "init.php";
	$data = json_decode(file_get_contents("php://input"));
	$uid = mysql_real_escape_string($data->uid);
	$pid = mysql_real_escape_string($data->pid);
	$prod = mysql_real_escape_string($data->prod);
	$quantity = mysql_real_escape_string($data->quantity);
	$query = "INSERT INTO orders(uid, pid, quantity, pname)
			 VALUES('$uid','$pid','$quantity','$prod')";
			mysql_query($query);


?>