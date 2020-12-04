<?php
    session_start();
    
	header('Access-Control-Allow-Origin: http://niccolosalvi.altervista.org/');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	require "config.php";
    
    $_SESSION["user"] = $_GET["nick"];
    $_SESSION["Nominativo"] = $_GET["nominativo"];
    $_SESSION["Email"] = $_GET["email"];
    $_SESSION["ProfileImage"] = $_GET["profileImage"];
    
    $hashed = hash('sha512', $_GET["pwd"]);

    $sql = "INSERT INTO chat_user (Nickname, Email, Nominativo, Bio, ProfileImage, Password, Token) VALUES (?, ?, ?, ?, ?, ?, ?)";
    if ($stmt = $mysql->prepare($sql)) {
        if ($_GET["bio"] == "null")
            $b = NULL;
        else
            $b = $_GET["bio"];

        $stmt->bind_param('sssssss', $_GET["nick"], $_GET["email"], $_GET["nominativo"], $b, $_GET["profileImage"], $hashed, $_GET["token"]);
        $stmt->execute();
    }
    
    $mysql->close();
?>