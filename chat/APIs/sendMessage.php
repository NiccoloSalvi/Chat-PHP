<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
	require("config.php");
    $data = array();
    
    $sql = "INSERT INTO chat_messaggio (Mittente, Destinatario, Testo, Tipo) VALUES (?, ?, ?, ?);";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('sssi', $_GET["mitt"], $_GET["dest"], $_GET["testo"], $_GET["tipo"]);
        $stmt->execute();
    }
    
    $sql = "SELECT ID FROM chat_messaggio ORDER BY DataMex DESC LIMIT 1";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
        }
    }
    
    echo json_encode($data);
    $mysql->close();
?>