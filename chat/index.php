<?php
    session_start();

    if (!isset($_SESSION["user"])) {
        ?>
        <script>
            window.location = "login.php"; // se utente viene sloggato, redirect to login page
        </script>
    <?php    
    }
?>
<!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
        
        <link rel="stylesheet" href="css/index.css"> <!-- style css -->
        <script src="js/index/script.js"></script> <!-- generale script js -->
        <script src="js/index/set.js"></script> <!-- script js che effettua richieste set api -->
        <script src="js/index/get.js"></script> <!-- script js che effettua richieste get api -->
        <script src="js/index/stt.js"></script> <!-- script js che implementa speech to text. funziona solo su chrome -->
    </head>
    <body onload="onloadPage(<?php echo '\'' . $_SESSION['user'] . '\''; ?>)">
        <div class="container-fluid">
            <div class="toast" id="toast" style="position: absolute; left: 60%; top: 10px; z-index: 1;" data-delay="7000">
                <div class="toast-header">
                    <svg class="rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                    <rect fill="#007aff" width="100%" height="100%" /></svg>
                    <strong class="mr-auto"></strong>
                    <small class="text-muted"></small>
                    <button button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body"></div>
            </div>
            <div class="row" id="page">
                <div class="col-lg-4 left" id="sx">
                    <div class="row icons">
                        <div class="profile-img">
                            <img src="img/users/<?php echo $_SESSION["ProfileImage"] ?>">
                        </div>
                        <div class="utility-icons">
                            <img src="img/utilities/status-24dp.svg">
                            <img src="img/utilities/add-24dp.svg">
                            <img class="dropdown-toggle" src="img/utilities/more_horiz-24dp.svg" data-toggle="dropdown">
                            <div class="dropdown-menu">
                                <a class="dropdown-item">Profilo</a>
                                <a class="dropdown-item">Impostazioni</a>
                                <a class="dropdown-item" href="logout.php">Disconnetti</a>
                            </div>
                        </div>
                    </div>
                    <div style="color: white; margin-top: 10px;">
                        <ul class="nav nav-tabs justify-content-center">
                            <li class="nav-item">
                                <a class="nav-link active" style="color: rgb(19, 28, 33)" id="navChats" onclick="getChats()">Chats</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="navAmici" onclick="getFriends()">Amici</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="navRichieste" onclick="getRequests()">Richieste</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="navAttesa" onclick="getWaiting()">In Attesa</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="navScopri" onclick="getNewFriends()">Scopri</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="navRifiutate" onclick="getDenied()">Rifiutate</a>
                            </li>
                        </ul>
                    </div>
                    <div class="row search-bar">
                        <div class="col-12 form-group">
                            <input type="text" class="form-control form-control-sm input-text" id="searchBar" onchange="searchMessage()">
                        </div>
                    </div>
                    <div class="row chat">
                        <div style="margin-top: 15px;" class="col-12" id="chats"></div>
                    </div>
                </div>
                <div class="col-lg-8 col-sm-12 right" id="dx"></div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>