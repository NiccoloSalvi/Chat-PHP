<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
	if (isset($_FILES['file']['name'])) {
		$filename = $_FILES['file']['name'];
        $location = "img/users/" . $filename;

     	$file_extension = pathinfo($location, PATHINFO_EXTENSION);
		$file_extension = strtolower($file_extension);
		$valid_ext = array("jpg","png","jpeg");
		$temp = explode(".", $_FILES["file"]["name"]);
		$newfilename = $_GET["nome"] . '.' . end($temp);
		
     	$response = false;
     	if (in_array($file_extension, $valid_ext)) {
        	if (move_uploaded_file($_FILES['file']['tmp_name'], "img/users/" . $newfilename)) {
           		$response = true;
        	}
     	}

		echo json_encode($response);
     	exit;
	}
?>