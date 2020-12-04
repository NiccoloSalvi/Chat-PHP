<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    require("config.php");
    
    $friends = array();
    $final = array();
    $data = array();
    
    function compareByName($a, $b) {
    	return strcmp($a["Nominativo"], $b["Nominativo"]);
	}
    
    if (validateJWT($_GET["token"], $_GET["us"])) {
        $sql = "SELECT * FROM chat_amicizia WHERE Richiedente=? OR Amico=?";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('ss', $_GET["us"], $_GET["us"]);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    if ($row["Richiedente"] == $_GET["us"])
                        array_push($friends, $row["Amico"]);
                    else
                        array_push($friends, $row["Richiedente"]);
                }
            }
        }
        
        $sql = "SELECT * FROM chat_user WHERE Nickname!=?";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('s', $_GET["us"]);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($data, $row);
                }
            }
        }
        
        for ($i = 0; $i < count($data); $i++) {
            if (!in_array($data[$i]["Nickname"], $friends))
                array_push($final, $data[$i]);
        }
        
        usort($final, 'compareByName');
        echo json_encode($final);
    } else {
        http_response_code(403);
    }
    $mysql->close();
?>