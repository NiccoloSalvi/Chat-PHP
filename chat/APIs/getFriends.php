<?php
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    require("config.php");

    $users = array();
    $usersData = array();
    
    function compareByName($a, $b) {
    	return strcmp($a["Nominativo"], $b["Nominativo"]);
    }

    if (validateJWT($_GET["token"], $_GET["us"])) {
        $sql = "SELECT * FROM chat_amicizia LEFT JOIN chat_messaggio ON (Richiedente=Destinatario OR Richiedente=Mittente) WHERE ID is NULL AND (Richiedente=? OR Amico=?) AND Accettata=1 UNION ALL SELECT * FROM chat_amicizia LEFT JOIN chat_messaggio ON (Amico=Destinatario OR Amico=Mittente) WHERE ID is NULL AND (Richiedente=? OR Amico=?) AND Accettata=1";
        if ($stmt = $mysql->prepare($sql)) {
            $stmt->bind_param('ssss', $_GET["us"], $_GET["us"], $_GET["us"], $_GET["us"]);
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
            $s = "SELECT * FROM chat_user WHERE Nickname=?";
            if ($stmt = $mysql->prepare($s)) {
                $stmt->bind_param('s', $us);
                $stmt->execute();

                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $temp["User"] = $row["Nickname"];
                        $temp["Nominativo"] = $row["Nominativo"];
                        $temp["ProfileImage"] = $row["ProfileImage"];
                        $temp["Bio"] = $row["Bio"];
                        array_push($usersData, $temp);
                    }
                }
            }
        }
        
        usort($usersData, 'compareByName');
        echo json_encode($usersData);
    } else
        http_response_code(403);

    $mysql->close();
?>