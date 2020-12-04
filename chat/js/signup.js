// promise to get data from external API
async function getData(url) {
    var pro = new Promise(resolve => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        xhttp.send();
    });

    return await pro;
}

async function setWebRequest(url) {
    var req = new Promise(resolve => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve();
            }
        }
        xhttp.send();
    });

    return await req;
}

async function upFile(url, file) {
    var formData = new FormData();
    formData.append("file", file);

    var req = new Promise(resolve => {

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        xhttp.send(formData);
    });

    return await req;
}

// function to execute signup
async function signup() {
	checkErr = false;
    
    // check if there are any errors
    errors = ["errEmail", "errPwd", "errNick"]; // list of all possible errors
    errors.forEach(err => {
        if (document.getElementsByClassName(err).length != 0) // check if there are any errors
            checkErr = true;
    });
    
    errs = document.getElementsByClassName("errPwdConfirm");
    if (equalsPwd()) { // if the confirm pwd is equal to the pwd
        if (errs.length > 0) // if there were any errors, remove them
            errs[0].remove();
        if (!checkErr && checkFields()) { // if there are no errors and all the required field are not empty
            getData("APIs/auth.php?us=" + signForm.nickname.value).then(function(token) {
                document.cookie = "token=" + token + "; expires=" + new Date(); // cookie

                if (signForm.bio.value == "")
                    bio = null;
                else
                    bio = signForm.bio.value;

                var files = document.getElementById("imgUpload").files;
                if (files.length < 1) {
                    setWebRequest("APIs/signup.php?nick=" + signForm.nickname.value + "&email=" + signForm.email.value + "&nominativo=" + signForm.nominativo.value + "&bio=" + bio + "&profileImage=blank.png" + "&pwd=" + signForm.pwd.value + "&token=" + token).then(async function() {
                        await sleep(1000);
                        window.location = "index.php";
                    });
                } else {
                    upFile("fileUpload.php?nome=" + signForm.nickname.value, files[0]).then(function(result) {
                        if (!result)
                            strFile = "blank.png";
                        else
                            strFile = signForm.nickname.value + "." + files[0].name.split('.')[1];
                        
                        setWebRequest("APIs/signup.php?nick=" + signForm.nickname.value + "&email=" + signForm.email.value + "&nominativo=" + signForm.nominativo.value + "&bio=" + bio + "&profileImage=" + strFile + "&pwd=" + signForm.pwd.value + "&token=" + token).then(async function() {
                            await sleep(1000);
                            window.location = "index.php";
                        });
                    });
                }
            });
        }
    } else { // if the two pwds entered are not the same
        if (errs.length == 0) { // if there are no other same messages
            sub = document.createElement("sub"); // sub tag
            sub.setAttribute("class", "err errPwdConfirm");
            sub.innerHTML = "Le password non coincidono";
            document.getElementById("pwdConfirm").appendChild(sub);
        }
    }
}

// check email
function checkEmail() {
    document.getElementById("fontEmail").setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw font"); // icon that represents the loading of the request
    errs = document.getElementsByClassName("errEmail");

    if (signForm.email.value != "") { // if the email field is not empty
        getData("APIs/checkData.php?val=" + signForm.email.value).then(async function(result) {
            if (!result) {
                await sleep(1000); // wait 1 sec
                document.getElementById("fontEmail").setAttribute("class", "fa fa-times font"); // icon that represents invalid email

                if (errs.length == 0) { // if there are no other errors
                    sub = document.createElement("sub"); // sub tag
                    sub.setAttribute("class", "err errEmail");
                    sub.innerHTML = "Email non disponibile";
                    document.getElementById("email").appendChild(sub);
                }
            } else { // if email is valid
                if (errs.length > 0) // if there was an error, remove it
                    errs[0].remove();
                
                await sleep(1000); // wait one sec
                document.getElementById("fontEmail").setAttribute("class", "fa fa-check-circle font"); // icon that represent the valid email
            }
        });
    } else {
        if (errs.length > 0) // if there was any errors, remove it
            errs[0].remove();
        document.getElementById("fontNick").setAttribute("class", "fas fa-envelope font"); // font that represents the email
    }
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// check nickname
function checkNick() {
    document.getElementById("fontNick").setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw font"); // icon that represents the loading of the request  
    errs = document.getElementsByClassName("errNick");

    if (signForm.nickname.value != "") { // if the nickname field is not empty
        getData("APIs/checkData.php?val=" + signForm.nickname.value).then(async function(result) {
            if (!result) {
                await sleep(1000); // wait 1 sec
                document.getElementById("fontNick").setAttribute("class", "fa fa-times font"); // icon that represents invalid nickname

                if (errs.length == 0) {
                    sub = document.createElement("sub"); // sub tag
                    sub.setAttribute("class", "err errNick");
                    sub.innerHTML = "Nickname non disponibile";
                    document.getElementById("nick").appendChild(sub);
                }
            } else { // if nickname is valid
                if (errs.length > 0) // if there was an error, remove it
                    errs[0].remove();
                
                await sleep(1000); // wait 1 sec
                document.getElementById("fontNick").setAttribute("class", "fa fa-check-circle font"); // font represents the valid nickname
            }
        });
    } else { // if username field is empty
        if (errs.length > 0) // if there was error, remove it
            errs[0].remove();
        document.getElementById("fontNick").setAttribute("class", "fas fa-user font"); // reset the font
    }
}

// check the fields required
function checkFields() {
    // if the required field are not empty
    if (signForm.nominativo.value != "" && signForm.nickname.value != ""
        && signForm.email.value != "" && signForm.pwd.value != "" && signForm.confirmPwd.value != "")
            return true;
    return false;
}

// check if two pwd are equals
function equalsPwd() {
    // if the two pwd are equals
    if (signForm.confirmPwd.value == signForm.pwd.value)
        return true;
    return false;
}

// pwd validator
function pwdValidator() {
    num = false;
    min = false;
    maiuc = false;
    pwd = signForm.pwd.value; // pwd entered by user

    if (pwd.length >= 8) { // min length of pwd
        if (pwd.match("[0-9]")) // pwd must contains at least one number
            num = true;
        
        if (pwd.match("[a-z]")) // pwd must contains at least one lower case letter
            min = true;
            
        if (pwd.match("[A-Z]")) // pwd must contains at least one upper case letter
            maiuc = true;
        
        if (num && min && maiuc) // if all three requirements are satisfied
            return true;
        return false;
    }
    return false;
}

// check if pwd is valid
function checkPwd() {
    errs = document.getElementsByClassName("errPwd");

    if (signForm.pwd.value != "") { // if the field is not empty
        if (!pwdValidator()) { // if pwd is invalid
            if (errs.length == 0) { // if there are no other same errors
                sub = document.createElement("sub"); // sub tag
                sub.setAttribute("class", "err errPwd");
                sub.innerHTML = "Password non valida";
                document.getElementById("pwd").appendChild(sub);
            }
        } else { // if pwd is valid
            if (errs.length > 0) // if there was error, remove it 
                errs[0].remove();
        }
    } else { // if the field is empty
        if (errs.length > 0) // if there was error, remove it
            errs[0].remove();
    }
}