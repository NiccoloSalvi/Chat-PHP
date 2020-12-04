<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    $servername = "localhost";
    $username = "niccolosalvi";
    $dbname = "my_niccolosalvi";
    $mysql = new mysqli($servername, $username, "", $dbname);

    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    if ($_GET["del"]) {
        $sql = "DELETE FROM chat_amicizia WHERE Richiedente=? AND Amico=?";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('ss', $_GET["amico"], $_GET["richiedente"]);
            $stmt->execute();
        }
    }
    
    $sql = "INSERT INTO chat_amicizia VALUES (NULL, ?, ?, 0, 0)";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('ss', $_GET["richiedente"], $_GET["amico"]);
        $stmt->execute();
    }
    $mysql->close();
?>