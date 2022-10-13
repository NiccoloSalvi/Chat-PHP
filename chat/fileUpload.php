<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
    
	if (isset($_FILES['file']['name'])) {
		$filename = $_FILES['file']['name'];
        	$location = "img/users/" . $filename;

     		$file_extension = strtolower(pathinfo($location, PATHINFO_EXTENSION));
		$file_size = filesize($filename);
		$valid_ext = array("jpg","png","jpeg");
		$temp = explode(".", $_FILES["file"]["name"]);
		$newfilename = $_GET["nome"] . '.' . end($temp);
		
     		if (!in_array($file_extension, $valid_ext) || $filesize > 3145728) {
			echo json_encode(false);	
		}
		
		if(!move_uploaded_file($_FILES['file']['tmp_name'], "img/users/" . $newfilename)){
			echo json_encode(false);
		}
		
		echo json_encode(true);
	}

	echo json_encode(false);
	exit;
?>
