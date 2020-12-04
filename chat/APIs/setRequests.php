<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    $servername = "";
    $username = "";
    $dbname = "";
    $mysql = new mysqli($servername, $username, "", $dbname);

    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    // $u = "niccosalvi";
    $sql = "UPDATE chat_amicizia SET Accettata=? WHERE Amico=? AND Richiedente=?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('iss', $_GET["valRichiesta"], $_GET["amico"], $_GET["richiedente"]);
        $stmt->execute();
    }
    $mysql->close();
?>