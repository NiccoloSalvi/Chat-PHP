<?php
	$config = [
		'DATABASE_HOST' => '',
		'DATABASE_NAME' => '',
		'DATABASE_USER' => '',
		'DATABASE_PASSWORD' => ''
	];
	
	$mysql = new mysqli($config["DATABASE_HOST"], $config["DATABASE_USER"], $config["DATABASE_PASSWORD"], $config["DATABASE_NAME"]);

	if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
	}
	
	function validateJWT($token, $user) {
		global $mysql;
		
		$sql = "SELECT Token FROM chat_user WHERE Nickname=?;";
    	if ($stmt = $mysql->prepare($sql)) {
			$stmt->bind_param('s', $user);
			$stmt->execute();

			$result = $stmt->get_result();
			if ($result->num_rows > 0)
				$tokenDb = $result->fetch_assoc()["Token"]; 
			else
				return false;
		}

		if ($tokenDb === $token)
			return true;
		return false;
	}
?>