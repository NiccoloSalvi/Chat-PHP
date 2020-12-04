<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

    require("config.php");
    
    $valuesTemp = array("ID", "Testo", "DataMex", "Ricevuto", "Letto", "Tipo");
    $users = array();
    $data = array();
    $allData = array();
    
    function date_compare($element1, $element2) {
    	$datetime1 = strtotime($element1['DataMex']); 
      	$datetime2 = strtotime($element2['DataMex']); 
      	return $datetime2 - $datetime1; 
    }
    
    if (validateJWT($_GET["token"], $_GET["us"])) {
        $sql = "SELECT * FROM chat_amicizia WHERE (Richiedente=? OR Amico=?) AND Accettata=1";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('ss', $_GET["us"], $_GET["us"]);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    if ($row["Amico"] == $_GET["us"])
                        array_push($users, $row["Richiedente"]);
                    else
                        array_push($users, $row["Amico"]);
                }
            }
        }
        
        foreach ($users as $us) {
            $sql = "SELECT * FROM chat_messaggio WHERE ((Destinatario=? AND Mittente=?) OR (Destinatario=? AND Mittente=?)) ORDER BY DataMex DESC LIMIT 1";
            if ($stmt = $mysql->prepare($sql)) {
                $stmt->bind_param('ssss', $_GET["us"], $us, $us, $_GET["us"]);
                $stmt->execute();

                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $data = [];
                        foreach ($valuesTemp as $v) {
                            $data[$v] = $row[$v];
                        }
                        if ($row["Destinatario"] != $_GET["us"]) { 
                            $data["User"] = $row["Destinatario"];
                            $data["Mittente"] = $_GET["us"];
                            $data["Destinatario"] = $row["Destinatario"];
                            $data["isDest"] = false;
                        } else { 
                            $data["User"] = $row["Mittente"];
                            $data["Mittente"] = $row["Mittente"];
                            $data["Destinatario"] = $_GET["us"];
                            $data["isDest"] = true;
                            $data["numMex"] = null;
                        }
                        $data["Nominativo"] = "";
                        $data["ProfileImage"] = "";
                        array_push($allData, $data);
                    }
                }
            }
        }
        
        $ind = 0;
        foreach ($allData as $us) {
            if ($us["isDest"]) {
                $sql = "SELECT * FROM chat_messaggio WHERE Destinatario=? AND Mittente=? AND Letto=0";
                if ($stmt = $mysql->prepare($sql)) {
                    $stmt->bind_param('ss', $_GET["us"], $us["Mittente"]);
                    $stmt->execute();

                    $result = $stmt->get_result();
                    $allData[$ind]["numMex"] = $result->num_rows;
                    echo $us["numMex"];
                }
            }
            $ind++;
        }
        
        $ind = 0;
        foreach ($allData as $us) {
            $sql = "SELECT * FROM chat_user WHERE Nickname=?";
            if ($stmt = $mysql->prepare($sql)) {
                $x = "Destinatario";
                if ($us["Destinatario"] == $_GET["us"])
                    $x = "Mittente";
                $stmt->bind_param('s', $us["User"]);
                $stmt->execute();

                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $allData[$ind]["Nominativo"] = $row["Nominativo"];
                        $allData[$ind]["ProfileImage"] = $row["ProfileImage"];
                    }
                }
            }
            $ind++;
        }
        usort($allData, 'date_compare');
        
        echo json_encode($allData);
    } else {
        http_response_code(403);
    }
    $mysql->close();
?>