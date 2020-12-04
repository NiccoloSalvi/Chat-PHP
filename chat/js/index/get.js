// promise per risolvere la richiesta ad un'API esterna. Il parametro indica il l'url del servizio richiesto
async function getWebRequest(url) {
    var req = new Promise(resolve => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url + "&token=" + getCookie("token"), true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        xhttp.send();
    });

    return await req;
}

// ritorna e crea un div nella sezione sinistra per tutti gli ultimi messagi tra un host e l'altro
function getChats(us) {
    if (us != undefined) // il parametro potrebbe anche non essere passato
        userLogged = us; // variabile globale che indica l'utente loggato nella chat
    modBeforeGet("navChats"); // modifica parametri 
    
    getWebRequest("APIs/getChats.php?us=" + userLogged).then(function(result) { // richiesta API esterna dell'ultimo messaggio per ogni chat
        if (result.length == 0)
            divNoElement("Non hai iniziato nessuna chat"); // se non ci sono elementi, visualizza la scritta
        else {
            result.forEach(el => { // per ogni chat
                // controllo sul testo del messaggio
                if (el["Testo"] == "Request accepted" && el["isDest"]) {
                    deleteMessage(el["ID"], el["Nominativo"], getDateNow(), "requestAccepted");
                } else {
                    if (el["Testo"] != "Request accepted")
                        wh.appendChild(createChatItem(el, "chats")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
                }
            });
        }
    });
}

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

// ritorna e crea un div nella sezione sinistra per tutti gli utenti amici dell'utente loggato con i quali non ha mai scambiato un messaggio
function getFriends() {
    modBeforeGet("navAmici"); // modifica parametri
    document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    
    getWebRequest("APIs/getFriends.php?us=" + userLogged).then(function(result) {
        if (result.length == 0) // se non ci sono amici
            divNoElement("Nessun nuovo amico");
        else {
            result.forEach(el => {
                wh.appendChild(createChatItem(el, "friends")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
            });
        }
    });
}

// ritorna e crea un div nella sezione sinistra per tutti gli utenti che non hanno ancora accettato la richiesta di amicizia dell'utente loggato
function getWaiting() {
    modBeforeGet("navAttesa"); // modifica parametri
    document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    
    getWebRequest("APIs/getWaiting.php?us=" + userLogged).then(function(result) {
        if (result.length == 0)
            divNoElement("Nessuna richiesta in attesa!"); // nessuna richiesta in attesa
        else {
            result.forEach(el => {
                    wh.appendChild(createChatItem(el, "waiting")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
            });
        }
    });
}

// ritorna e crea un div nella sezione sinistra per tutti gli utenti che hanno richiesto l'amicizia all'utente loggato
function getRequests() {
    modBeforeGet("navRichieste"); // modifica parametri
    document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    
    getWebRequest("APIs/getRequests.php?us=" + userLogged).then(function(result) {
        if (result.length == 0)
            divNoElement("Nessuna richiesta di amicizia!"); // nessun utente ha chiesto l'amicizia all'utente loggato nell chat
        else {
            result.forEach(el => {
                wh.appendChild(createChatItem(el, "requests")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
            });
        }
    });
}

// ritorna e crea un div nella sezione sinistra per tutti gli utenti che non sono l'utente loggato non conosce, ne mai inviato alcuna richiesta, ...
function getNewFriends() {
    modBeforeGet("navScopri"); // modifica parametri
    document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa

    getWebRequest("APIs/getUsers.php?us=" + userLogged).then(function(result) {
        if (result.length == 0)
            divNoElement("Nessun nuovo possibile amico!"); // se non ci sono più utenti da esplorare
        else {
            result.forEach(el => {
                wh.appendChild(createChatItem(el, "newFriends")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
            });
        }
    });
}

// ritorna e crea un div nella sezione sinistra per tutti gli utenti che hanno rifiutato o che l'utente loggato ha rifiutato la richiesta di amicizia
function getDenied() {
    modBeforeGet("navRifiutate"); // modifica parametri
    document.getElementById("dx").innerHTML = ""; // elimina la sezione destra della page, se è contenuto qualcosa
    
    getWebRequest("APIs/getDenied.php?us=" + userLogged).then(function(result) {
        if (result.length == 0)
            divNoElement("Nessun utente rifiutato!"); // non c'è nessun utente che è stato rifiutato
        else {
            result.forEach(el => {
                wh.appendChild(createChatItem(el, "denied")); // per ogni elemento nel vettore, aggiunta aggiunto il div nella sezione sinistra della page
            });
        }
    });
}

// eliminazione di messaggi notifiche
function deleteMessage(id, us, dataRicezione, type) {
    getWebRequest("APIs/deleteMessage.php?id=" + id).then(function(res) {
        ricezioneTime = Math.round(new Date(dataRicezione).getTime() / 1000); // ora della ricezione del messaggio
        invioTime = Math.round(new Date(res).getTime() / 1000); // ora del momento in cui è stato inviato il messaggio
        differenceInSeconds = ricezioneTime - invioTime; // differenza tra le due date in secondi
        differenceInMinutes = differenceInSeconds / 60; // differenza tra le due date in minuti
        
        if (type == "requestAccepted") {
            document.getElementsByClassName("mr-auto")[0].innerHTML = "Nuovo Amico";
            if (differenceInSeconds < 10)
                document.getElementsByClassName("text-muted")[0].innerHTML = "Just now";
            else if (differenceInSeconds < 60)
                document.getElementsByClassName("text-muted")[0].innerHTML = differenceInSeconds + " secs ago";    
            else
                document.getElementsByClassName("text-muted")[0].innerHTML = Math.round(differenceInMinutes, 1) + " mins ago";
                
            document.getElementsByClassName("toast-body")[0].innerHTML = us + " ha accettato la tua richiesta di amicizia";
        }
        $('#toast').toast('show');
    });
}

function getMessages(otherUser, where, result) {
    for (ind = 0; ind < result.length; ind++) {
        if (ind != 0) {
            diffTime = Math.abs(new Date(result[ind]["DataMex"].split(' ')[0]) - new Date(result[ind - 1]["DataMex"].split(' ')[0]));
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                diff = Math.abs(new Date(result[ind]["DataMex"].split(' ')[0]) - new Date(getDateNow().split(' ')[0]));
                diffD = Math.ceil(diff / (1000 * 60 * 60 * 24));
                if (diffD == 0)
                    where.appendChild(dataMessage("Oggi", false));
                else if (diffD == 1)
                    where.appendChild(dataMessage("Ieri", false));
                else
                    where.appendChild(dataMessage(result[ind]["DataMex"].split(" ")[0], true));
            }         
        } else {
            where.appendChild(dataMessage(result[ind]["DataMex"].split(" ")[0], true));
        }
        where.appendChild(createMessage(otherUser, result[ind]));
    }
}

// invio messagi, dato il mittente, destinatario, testo e tipo del messaggio
function sendMessage(mitt, dest, testo, tipo) {
    where = document.getElementById("dChatWindow");

    getWebRequest("APIs/sendMessage.php?mitt=" + mitt + "&dest=" + dest + "&testo=" + testo + "&tipo=" + tipo).then(function(res) {
        if (testo != "Request accepted") {
            vett = {
                "ID": res["ID"],
                "Testo": testo,
                "DataMex": getDateNow(),
                "Destinatario": dest,
                "Mittente": mitt,
                "Ricevuto": 0,
                "Letto": 0,
                "Tipo": 0
            }

            stored = JSON.parse(localStorage.getItem("messages")); // vettore recuperato dal local storage
            stored.push(vett); // aggiunto messaggio inviato al local storage
            localStorage.setItem("messages", JSON.stringify(stored)); // /set local storage con il vettore appena aggiornato

            mexDates = document.getElementsByClassName("invisibleDate");
            if (mexDates.length > 0) {
                diffTime = Math.abs(new Date(vett["DataMex"].split(' ')[0]) - new Date(mexDates[mexDates.length - 1].innerText.split(' ')[0]));
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays != 0)
                    where.appendChild(dataMessage("Oggi", false));
            } else
                where.appendChild(dataMessage(vett["DataMex"].split(" ")[0], true));
            
            where.appendChild(createMessage(dest, vett));
            document.getElementById("sendMex").value = "";
            document.getElementById("sendMex").placeholder = "Scrivi un messaggio";
        }

        document.getElementById("chats").innerHTML = "";
        //getChats(mitt);
    });
}

// funzione per verificare gli array dei messaggi arrivati all'utente loggato e quelli presenti nel db
function getChatsArray() {
    getWebRequest("APIs/getChats.php?us=" + userLogged).then(function(result) {
        chatsJS = []; // azzero array chat stampate
        allChats = document.getElementsByClassName("chat-items"); // tutte le singole chat presenti
        ids = document.getElementsByClassName("IDhidden"); // tutti gli id delle chat. id è invisibile in modo tale che l'utente non possa vederlo
        if (ids.length > 0) {
      		for (i = 0; i < allChats.length; i++) {
              chatsJS.push({ // nuovo elemento nel vettore
                "User": allChats[i].id,
                "DataMex": allChats[i].innerText.split("\n")[1],
                "Testo": allChats[i].innerText.split("\n")[2],
                "ID": ids[i].innerHTML
              });
            }
        }
        getDifferences(result, chatsJS); // ottenere modifiche tra i messaggi nel db e quelli stampati
    });
}