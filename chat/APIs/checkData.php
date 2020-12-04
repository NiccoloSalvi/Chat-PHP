<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	require("config.php");
    
    $ret;
    $sql = "SELECT Nickname FROM chat_user WHERE Email=? OR Nickname=? ";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('ss', $_GET["val"], $_GET["val"]);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $el = $result->fetch_assoc();
            $ret = false; 
        }
        else {
        	$ret = true;
        }
    }
    
    echo json_encode($ret);
    $mysql->close();
?>