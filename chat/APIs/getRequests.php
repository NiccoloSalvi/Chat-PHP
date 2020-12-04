<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    require("config.php");
    
    $users = array();
    
    function compareByName($a, $b) {
    	return strcmp($a["Nominativo"], $b["Nominativo"]);
	}
    
    if (validateJWT($_GET["token"], $_GET["us"])) {
        $sql = "SELECT * FROM chat_user INNER JOIN chat_amicizia on Nickname=Richiedente WHERE Accettata=0 AND Amico=?";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('s', $_GET["us"]);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($users, $row);
                }
            }
        }
        
        usort($users, 'compareByName');
        echo json_encode($users);
    } else {
        http_response_code(403);
    }
    $mysql->close();
?>