// promise per risolvere la chiamata ad un'API esterna, che non risponde con alcun valore, ma setta solo dei dati. Il parametro indica il l'url del servizio richiesto
async function setWebRequest(url) {
    var req = new Promise(resolve => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url + "&token=" + getCookie("token"), true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve();
            }
        }
        xhttp.send();
    });

    return await req;
}

// effettua una richiesta, per diventare amico di un utente
function setRequests(richiedente, amico, val) {
    setWebRequest("APIs/setRequests.php?richiedente=" + richiedente + "&amico=" + amico + "&valRichiesta=" + val).then(function() {
        getChats(); // una volta eseguita l'API viene redirect direttamente alla sezione delle chats e messaggi
        document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    });
}

// effettua una nuova richiesta ad un nuovo utente
function newRequest(richiedente, amico, del) {
    setWebRequest("APIs/newRequest.php?richiedente=" + richiedente + "&amico=" + amico + "&del=" + del).then(function() {
        getChats(); // una volta eseguita l'API viene redirect direttamente alla sezione delle chats e messaggi
        document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    });
}

// modifica dello stato di lettura di un messaggio
function setLetto(mitt, dest) {
    setWebRequest("APIs/setLetto.php?mitt=" + mitt + "&dest=" + dest).then(function() {
        getChats(); // una volta eseguita l'API viene redirect direttamente alla sezione delle chats e messaggi
    });
}