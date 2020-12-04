<?php
	session_start();
    
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
    require("config.php");
	
    $hashed = hash('sha512', $_GET["pwd"]);
    $sql = "SELECT * FROM chat_user WHERE (Nickname=? OR Email=?) AND Password=?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param('sss', $_GET["us"], $_GET["us"], $hashed);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $el = $result->fetch_assoc();
            
            $_SESSION["user"] = $el["Nickname"];
            $_SESSION["Nominativo"] = $el["Nominativo"];
            $_SESSION["Email"] = $el["Email"];
            $_SESSION["ProfileImage"] = $el["ProfileImage"];
        }
        else
        	$el = false;
    }
    
    echo json_encode($el);
    $mysql->close();
?>