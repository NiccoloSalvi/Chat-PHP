async function getData(url) {
    var chats = new Promise(resolve => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        xhttp.send();
    });

    return await chats;
}

function login() {
    userLogged = loginForm.username.value; // user entered
    pwd = loginForm.password.value; // pwd entered

    // calling the api that handle the login to the chat
    getData("APIs/login.php?us=" + userLogged + "&pwd=" + pwd).then(function(result) {
        if (!result) { // if api return false
            loginForm.password.value = ""; // reset password input
            // check if the entered pwd has been already wrong 
            if (document.getElementsByClassName("subErr").length == 0) {
                sub = document.createElement("sub"); // sub tag
                sub.setAttribute("class", "subErr"); // sub class
                sub.innerHTML = "Wrong Password"; // text of sub

                document.getElementById("err").appendChild(sub); // append to the same div of pwd input
            }
        } else {
            getData("APIs/auth.php?us=" + loginForm.username.value).then(function(result) {
                document.cookie = "token=" + result + "; expires=" + new Date(); // cookie
                saveMessages(loginForm.username.value, result);
            });
        }
    });
}

// every time you login into chat, get all the messages 
function saveMessages(userLogged, token) {
    var stored = JSON.parse(localStorage.getItem("messages"));
    if (stored == null) {
        getData("APIs/getAllMex.php?us=" + userLogged + "&token=" + token).then(function(result) {
            localStorage.setItem("messages", JSON.stringify(result));

            window.location = "index.php";
        });
    } else {
        getData("APIs/getAllMex_2.php?us=" + userLogged + "&token=" + token + "&data=" + new Date(stored[stored.length - 1]["DataMex"]).getTime() / 1000).then(function(result) {
            result.forEach(element => {
                stored.push(element);
            });
            localStorage.setItem("messages", JSON.stringify(stored));

            window.location = "index.php";
        });
    }
}