<?php
    header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	require("config.php");
    
    $users = [];
    
    $datetimeFormat = 'Y/m/d H:i:s';
    $date = new Datetime();
    $date->setTimezone(new DateTimeZone('Europe/Rome'));
    $date->setTimestamp($_GET["data"]);
    
    $dataFormatted = $date->format($datetimeFormat);
    
    $sql = "SELECT * FROM chat_messaggio WHERE ((Mittente=? OR Destinatario=?) AND DataMex > ?) ORDER BY DataMex ASC";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('sss', $_GET["us"], $_GET["us"], $dataFormatted);
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