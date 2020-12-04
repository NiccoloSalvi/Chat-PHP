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

    $sql = "UPDATE chat_messaggio SET Letto=1 WHERE Mittente=? AND Destinatario=? AND Letto=0";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('ss', $_GET["mitt"], $_GET["dest"]);
        $stmt->execute();
    }
    $mysql->close();
?>