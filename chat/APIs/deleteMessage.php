<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	require("config.php");
    
    
    $sql = "SELECT DataMex FROM chat_messaggio WHERE ID=?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('i', $_GET["id"]);
        $stmt->execute();
        
        $res = $stmt->get_result();
        $data = $res->fetch_assoc()["DataMex"];
    }
    
    $sql = "DELETE FROM chat_messaggio WHERE ID=?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('i', $_GET["id"]);
        $stmt->execute();
    }
    
    echo json_encode($data);
    $mysql->close();
?>