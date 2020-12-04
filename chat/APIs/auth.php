<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

	$nick = $_GET["us"];
	$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode(['user_id' => $nick]);

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
	$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    
    $mysql = new mysqli('', '', '', '');
    
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
	}

    $sql = "UPDATE chat_user SET Token=? WHERE Nickname=?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('ss', $jwt, $nick);
        $stmt->execute();
    }

    echo json_encode($jwt);
?>