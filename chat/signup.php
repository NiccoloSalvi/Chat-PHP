<!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="css/signup.css"> <!-- style css -->
        <script src="js/signup.js"></script> <!-- script js -->
    </head>
    <body>
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-5 wrapper">
                    <div class="form text-center">
                        <img src="img/utilities/logo.png" class="logo-img" alt="">
                        <br>
                        <h1 class="form-title">SIGN UP</h1>
                        <br>
                        <form name="signForm">
                            <div class="form-group">
                                <input class="form-control" type="text" name="nominativo" placeholder="Cognome & Nome">
                                <i class="fas fa-user font"></i>
                            </div>
                            <div id="nick" class="form-group">
                                <input class="form-control" type="text" name="nickname" placeholder="Username" onchange="checkNick()">
                                <i id="fontNick" class="fas fa-user font"></i>
                            </div>
                            <div id="email" class="form-group">
                                <input class="form-control" type="email" name="email" placeholder="Email" onchange="checkEmail()">
                                <i id="fontEmail" class="fa fa-envelope font"></i>
                            </div>
                            <div id="bio" class="form-group">
                                <input class="form-control" type="text" name="bio" placeholder="Bio">
                                <i class="fa fa-info font"></i>
                            </div>
                            <div id="pwd" data-toggle="tooltip" data-placement="top" title="La password deve essere almeno composta da 8 caratteri e contenere almeno un numero, una lettera minuscola ed una maiuscuola" class="form-group">
                                <input class="form-control" type="password" name="pwd" placeholder="Password" onchange="checkPwd()">
                                <i class="fas fa-unlock-alt font"></i>
                            </div>
                            <div id="pwdConfirm" class="form-group">
                                <input class="form-control" type="password" name="confirmPwd" placeholder="Conferma password">
                                <i class="fas fa-unlock-alt font"></i>
                            </div>
                            <div class="form-group">
                                <label>Foto Profilo</label>
                                <input type="file" id="imgUpload" name="imgUpload" class="form-control-file">
                            </div>
                            <button type="button" onclick="signup()" class="btn">Sign Up</button>
                            <br><br>
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