<?php
    session_start();
?>
<!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Chat</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="css/login.css"> <!-- style css -->
        <script src="js/login.js"></script> <!-- script js -->
    </head>
    <body>
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-5 wrapper">
                    <div class="form text-center">
                        <img src="img/utilities/logo.png" class="logo-img" alt="">
                        <br>
                        <h1 class="form-title">Login</h1>
                        <br>
                        <?php
                            // se l'utente è già loggato
                            if (isset($_SESSION["user"])) {
                                ?>
                                <script>
                                    function getCookie(cname) {
                                        var name = cname + "=";
                                        var decodedCookie = decodeURIComponent(document.cookie);
                                        var ca = decodedCookie.split(';');

                                        for (var i = 0; i < ca.length; i++) {
                                            var c = ca[i];
                                            while(c.charAt(0) == ' ') {
                                                c = c.substring(1);
                                            }
                                            if (c.indexOf(name) == 0) {
                                                return c.substring(name.length, c.length);
                                            }
                                        }
                                        return "";
                                    }
                                    
                                    saveMessages(<?php echo '\'' . $_SESSION['user'] . '\''; ?>, getCookie("token")); // salvataggio dei messaggi
                                </script>
                                <?php
                            }
                        ?>
                        <form name="loginForm">
                            <div class="form-group">
                                <input class="form-control" type="text" name="username" placeholder="Username" required>
                                <i class="fas fa-user font"></i>
                            </div>
                            <div id="err" class="form-group">
                                <input class="form-control" type="password" name="password" placeholder="Password" required>
                                <i class="fas fa-unlock-alt font"></i>
                            </div>
                            <br>
                            <button type="button" onclick="login()" class="btn">Login</button>
                            <br><br>
                            <p class="no-account">Don't have an account? <a href="signup.php">Sign Up</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
</html>