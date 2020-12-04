<?php
    header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	require("config.php");
    
    $users = [];
    $sql = "SELECT * FROM chat_messaggio WHERE Mittente=? OR Destinatario=? ORDER BY DataMex ASC";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('ss', $_GET["us"], $_GET["us"]);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
            	array_push($users, $row);
            }
        }
    }
    
    echo json_encode($users);
    $mysql->close();
?>