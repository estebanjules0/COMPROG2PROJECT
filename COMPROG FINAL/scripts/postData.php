<?php
	include "init.php";

	$data = json_decode(file_get_contents("php://input"));
	$method = mysql_real_escape_string($data->method);
	if ($method == "register") {
		$username = mysql_real_escape_string($data->uname);
		$password = mysql_real_escape_string($data->pword);
		$password = md5($password);
		$first_name = mysql_real_escape_string($data->fname);
		$last_name = mysql_real_escape_string($data->lname);
		$email = mysql_real_escape_string($data->email);
		$cNum = mysql_real_escape_string($data->cNum);
		if(!is_numeric($cNum)){
			echo 'invalid';
		}
		$gender = mysql_real_escape_string($data->gender);
		$birth_date = mysql_real_escape_string($data->birthday);
		$queryCheck = "SELECT * FROM users WHERE username='$username' OR email= '$email' ";
		$checkResult = mysql_query($queryCheck);
		$checkRow = mysql_fetch_array($checkResult);
		if(empty($checkRow)){
			$query = "INSERT INTO users(username, password, first_name, last_name, email, gender, birth_date, contact_num)
			VALUES('$username', '$password', '$first_name', '$last_name', '$email', '$gender', '$birth_date', '$cNum')";
			mysql_query($query);
			echo 'success';
		}
		else{
			if($checkRow['username'] == $username && $checkRow['email'] == $email){
				echo 'ue';
			}
			elseif($checkRow['username'] == $username){
				echo 'username';
			}
			elseif ($checkRow['email'] == $email) {
				echo 'email';
			}
		}


		
	}
	else if ($method == "login") {
		$username = mysql_real_escape_string($data->uname);
		$password = mysql_real_escape_string($data->pword);
		$password = md5($password);
		$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$_SESSION['id'] = $row['id'];
		echo $_SESSION['id'];
	}

	else if($method == "getCurrentUser"){
		$userId = mysql_real_escape_string($data->cid);
		$query = "SELECT * FROM users WHERE id = '$userId'";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$jsonData = json_encode($row);
		echo $jsonData;
	}
	
	else if($method == "updateDetails"){
		$userId = mysql_real_escape_string($data->cid);
		$email = mysql_real_escape_string($data->email);
		$number = mysql_real_escape_string($data->number);
		$password = mysql_real_escape_string($data->pword);
		$password = md5($password);

		if(!empty($email)){
			$query = "UPDATE users SET email = '$email' WHERE id = '$userId'";
			mysql_query($query);
		}

		if(!empty($number)){
			$query = "UPDATE users SET contact_num = '$number' WHERE id = '$userId'";
			mysql_query($query);
		}

		if(!empty($password)){
			$query = "UPDATE users SET password = '$password' WHERE id = '$userId'";
			mysql_query($query);
		}
	}

	else if($method == "getProducts"){
		$dataArray = [];
		for($x = 0; $x < sizeof($data->carts); $x++){
			$pid = mysql_real_escape_string($data->carts[$x]);
			$query = "SELECT * FROM products WHERE pid = '$pid'";
			$result = mysql_query($query);
			$row = mysql_fetch_array($result);
			array_push($dataArray, $row);
		}
		
		$jsonData = json_encode($dataArray);
		echo $jsonData;
	}

	else if($method == "checkout"){
		$uid = mysql_real_escape_string($data->uid);
		$paymentId = mysql_real_escape_string($data->paymentId);
		$token = mysql_real_escape_string($data->token);
		$payerId = mysql_real_escape_string($data->payerId);
		$total = mysql_real_escape_string($data->total);
		$query = "INSERT INTO orders(uid, paymentId, paymentToken, payerId, total)
			VALUES('$uid','$paymentId','$token','$payerId','$total')";
		mysql_query($query);

	}

	else if($method == "orders"){
		$query = "SELECT * FROM orders";
		$result = mysql_query($query);
		while($row = mysql_fetch_array($result)){
			$array_result[] = $row;
		}
		echo json_encode($array_result);
	}
	
?>