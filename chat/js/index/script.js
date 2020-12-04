var pathImages = "http://niccolosalvi.altervista.org/chatV2/img/"; // path da dove ottenere tutte le immagini
var userLogged; // utente loggato nella chat
var indChanges = []; // vettore di utenti, i quali messaggi sono cambiati, nuovi messaggi arrivati
var timerChats = setInterval(getValues, 2000); // ogni 2 secondi, controlla l'arrivo di nuovi messaggi

// eseguita all'onload del body
function onloadPage(us) {
    getChats(us); // ottenute tutte le chats
}

// ritorna la data attuale sotto formato di stringa
function getDateNow() {
    d = new Date();

    ora = d.toString().split(" ")[4];
    if (d.getMonth().toString().length == 1) // se il mese è composto da una solo cifra, aggiunto 0 canonico
        mt = "0" + (d.getMonth() + 1);
    else
        mt = d.getMonth() + 1;

    if (d.getDate().toString().length == 1) // se il mese è composto da una solo cifra, aggiunto 0 canonico
        dt = "0" + d.getDate();
    else
        dt = d.getDate();

    return d.getFullYear() + "-" + mt + "-" + dt + " " + ora;
}

// reset titoli della nav nella sezione sinistra della page
function resetNav() {
    navs = document.getElementsByClassName("nav-link"); // vettore che rappresenta tutti i titoli presenti nella nav
    for (i = 0; i < navs.length; i++) {
        navs[i].setAttribute("class", "nav-link"); // reset della classe, per rendere inattivi tutti i titoli della nav
        navs[i].style.color = "white"; // colore bianco del testo dei titoli della nav 
    }
}

// modifica della barra di ricerca, in base alla sezione attiva
function modSearchBar(id) {
    if (id == "navChats") // se è attiva la sezione delle chat
        strPlaceholder = "Cerca chat o messaggio";
    else if (id == "navAmici") // se è attiva la sezione degli amici
        strPlaceholder = "Inizia una nuova chat";
    else // se è attiva una della altre sezioni     
        strPlaceholder = "Cerca utente";
    document.getElementById("searchBar").placeholder = strPlaceholder; // modifica placeholder della barra di ricerca
}

// modifica la nav nella sezione sinistra della page
function modNavItems(id) {
    resetNav(); // reset titoli nav
    document.getElementById(id).setAttribute("class", "nav-link active"); // cambio classe del titolo attivo della nav
    document.getElementById(id).style.color = 'rgb(19, 28, 33)'; // colore del titolo attivo della nav

    modSearchBar(id); // modifica della barra di ricerca, in base alla sezione attiva
}

// modifica ciò che è necessario, al cambio di titolo attivo nella nav
function modBeforeGet(whichID) {
    modNavItems(whichID); // modifica la nav nella sezione sinistra della page

    wh = document.getElementById("chats"); // div dove vengono visualizzate le chats/amici/richieste nelle sezione sinistra della page
    wh.innerHTML = ""; // eliminato il contenuto della sezione
    if (document.getElementById("divLateral") != null) {
        document.getElementById("divLateral").remove();
        document.getElementById("dx").setAttribute("class", "col-lg-8 right");
    }
}

// display div nel caso in cui non vi siano elementi
function divNoElement(str) {
    d = createDiv("chat-items no-element"); // creazione div con relative classi
    h2 = document.createElement("h2"); // titolo del div
    h2.style.textAlign = "center"; // testo centrato
    h2.innerHTML = str; // contenuto della scritta variabile in base alla sezione attiva
    
    d.appendChild(h2);
    wh.appendChild(d);
}

// creazione div che contiene le immagini
function createImage(cl, wImg, ut) {
    if (ut)
        pt = "utilities/";
    else 
        pt = "users/";

    divContenitor = document.createElement("div");
    divContenitor.setAttribute("class", cl); // classe relativa al div che contiene l'immagine
    img = document.createElement("img");
    img.src = pathImages + pt + wImg; // src dell'immagine, concatenazione della stringa comune a tutte le immagine e il file specifico
    divContenitor.appendChild(img); // image aggiunta al div

    return divContenitor;
}

// creazione div e set della classe specifica, passata come parametro
function createDiv(cl) {
    div = document.createElement("div");
    div.setAttribute("class", cl);

    return div;
}

// get ora dalla data completa, passata come parametro
function getOraFromData(data) {
    dt = data.split(" ")[1].split(":").slice(0, 2);
    return dt[0] + ":" + dt[1];
}

// nav sezione destra della page
function createRowIcons(imgProfile, nominativo) {
    rIcons = createDiv("row icons"); // div con una specifica classe
    
    dIconsImage = createDiv("profile-img");
    ProfileImage = document.createElement("img");
    ProfileImage.src = pathImages + "users/" + imgProfile; // foto profilo dell'utente con cui si è espansa la chat
    spanUsername = document.createElement("span");
    spanUsername.setAttribute("class", "username");
    spanUsername.setAttribute("id", "usernameBig");
    spanUsername.innerHTML = nominativo; // nominativo del utente con cui si è espansa la chat
    dIconsImage.appendChild(ProfileImage);
    dIconsImage.appendChild(spanUsername);

    dUtilityIcons = createDiv("utilities-icons");
    fUtilityIcon = document.createElement("img");
    fUtilityIcon.setAttribute("id", "searchButton");
    fUtilityIcon.src = pathImages + "utilities/" + "search_white-24dp.svg"; // img per cercare messaggi inviati solo in quella chat
    
    sUtilityIcon = document.createElement("img");
    sUtilityIcon.src = pathImages + "utilities/" + "more_horiz-24dp.svg"; // img impostazioni
    dUtilityIcons.appendChild(fUtilityIcon);
    dUtilityIcons.appendChild(sUtilityIcon);
    
    rIcons.appendChild(dIconsImage);
    rIcons.appendChild(dUtilityIcons);

    return rIcons;
}

// create la form per l'invio dei messaggi. Come parametro, il nickname del destinatario al quale verrà inviato il messaggio
function createMessagesForm(dest) {
    dRow = createDiv("row send-messages"); // div con relativa classe
    
    dIconsLeft = document.createElement("div");
    dIconsLeft.style.marginLeft = "15px"; // style css
    fImg = document.createElement("img");
    fImg.src = pathImages + "utilities/" + "emoji-24dp.svg"; // img emoji
    sImg = document.createElement("img");
    sImg.setAttribute("class", "dropdown-toggle");
    sImg.setAttribute("data-toggle", "dropdown");
    sImg.src = pathImages + "utilities/" + "attach_file-24dp.svg"; // img per file multimediali
    sImg.style.marginLeft = "10px"; // style css
    dDrop = document.createElement("div");
    dDrop.setAttribute("class", "dropdown-menu");
    a = document.createElement("a");
    a.setAttribute("class", "dropdown-item");
    a.innerHTML = "CIAO";

    dDrop.appendChild(a);

    dIconsLeft.appendChild(fImg);
    dIconsLeft.appendChild(sImg);
    dIconsLeft.appendChild(dDrop);

    dInputText = createDiv("col-11");
    inpText = document.createElement("input");
    inpText.setAttribute("type", "text");
    inpText.setAttribute("class", "form-control form-control-sm input-text");
    inpText.setAttribute("id", "sendMex"); // identificativo barra di invio messaggi
    inpText.placeholder = "Scrivi un messaggio";

    document.getElementById("searchButton").onclick = function() { searchMexChat(document.getElementById("usernameBig").innerHTML, dest); };
    
    inpText.onkeypress = function(e) {
        if (e.keyCode == 13) {
            sendMessage(userLogged, dest, inpText.value, 0); // se viene premuto il tasto "Invio", viene inviato il messaggio
            getChats(userLogged);
        }
    }
    dInputText.appendChild(inpText);
    
    dIconRight = document.createElement("div");
    img = document.createElement("img");
    img.src = pathImages + "utilities/" + "keyboard_voice-24dp.svg"; // img microfono
    img.addEventListener("click", function() { startRec(inpText); }, false); // speech to text. Al click ha inizio la registrazione ed il riconoscimento
    dIconRight.appendChild(img);

    dRow.appendChild(dIconsLeft);
    dRow.appendChild(dInputText);
    dRow.appendChild(dIconRight);

    return dRow;
}

// div dove vengono visualizzati tutti i messaggi scambiati tra un utente e l'altro
function createDxSection(nick, profile, nominativo) {
    wh = document.getElementById("dx"); // sezione destra della page
    wh.appendChild(createRowIcons(profile, nominativo)); // riga di intestazione alla sezione, presente la foto profilo dell'amico dell'utente amico

    dContainer = createDiv("container");
    dChatWindow = createDiv("chat-window");
    dChatWindow.setAttribute("id", "dChatWindow"); // id del contenitore
    
    vett = []; // vettore temporaneo dove vengono memorizzate le chat utili
    stored = JSON.parse(localStorage.getItem("messages")); // vettore memorizzato nel local storage
    for (i = 0; i < stored.length; i++) {
        if ((stored[i]["Destinatario"] == nick && stored[i]["Mittente"] == userLogged) || (stored[i]["Destinatario"] == userLogged && stored[i]["Mittente"] == nick))
            vett.push(stored[i]); // messaggio inserito in un vettore temporaneo
    }

    getMessages(nick, dChatWindow, vett); // ottenuti tutti i messaggi da un utente all'altro
    dContainer.appendChild(dChatWindow);
    wh.appendChild(dContainer);
    wh.appendChild(createMessagesForm(nick));

    out = document.getElementById("sendMex").focus(); // focus su input text per inviare i messaggi
    element = document.getElementsByClassName("container")[0];
    element.scrollTo(0, element.offsetHeight); // set posizione scrollbar alla fine del div
}

// crea row che rappresenta una chat/amico/richiesta in base alla sezione attiva
function createChatItem(vett, type) {
    d = document.createElement("div"); // div che contiene tutte le informazioni necessarie
    d.setAttribute("class", "chat-items"); // aggiunta classe
    d.setAttribute("id", vett["User"]); // identificativo del div è l'identificativo dell'utente con il quale è stato scambiato il messaggio, in modo tale di avere sempre un'univocità
    d.setAttribute("nome", vett["Nominativo"].toLowerCase()); // nominativo dell'utente salvato come attributo del div

    r = document.createElement("div");
    // se l'utente loggato è il destinatario del messaggio inviato
    if (vett["isDest"]) {
        if (!vett["Letto"]) // se il messaggio non è ancora stato letto
            r.setAttribute("class", "row new"); // specifica classe
        else
            r.setAttribute("class", "row"); // reset della classe
    } else
        r.setAttribute("class", "row"); // classe standard

    c = createDiv("col-1");
    d.appendChild(r);
    
    dv = createDiv("col-11");
    rUser = document.createElement("div");
    rUser.setAttribute("class", "row");
    dNew = document.createElement("div");
    dNew.setAttribute("class", "col-6");
    divUsername = document.createElement("div");
    divUsername.setAttribute("class", "username"); // classe specifica
    span = document.createElement("span");
    span.innerHTML = vett["Nominativo"]; // nominativo dell'utente come titolo del singolo elemento nella sezione sinistra
    divUsername.appendChild(span);
    dNew.appendChild(divUsername);
    rUser.appendChild(dNew);

    if (type == "chats") { // se si tratta di chats
        dNew_2 = document.createElement("div");
        dNew_2.setAttribute("class", "col-6");
        divTime = document.createElement("div");
        divTime.setAttribute("class", "chat-time"); // classe relativa per la visualizzazione dell'orario di invio del mex
        divTime.style.float = "right"; // posizione orario
        sp = document.createElement("span");
        sp.setAttribute("class", "data"); // classe standard
        
        sp.innerHTML = getOraFromData(vett["DataMex"]); // visualizzazione dell'ora dalla data completa
        divTime.appendChild(sp);

        dNew_2.appendChild(divTime);
        rUser.appendChild(dNew_2);
    }
    
    if (type == "waiting" || type == "denied") { // se le sezioni attive sono le seguenti
        dNew_2 = document.createElement("div");
        dNew_2.setAttribute("class", "col-3 offset-3")
        btn1 = document.createElement("button");
        btn1.setAttribute("type", "button");
        btn1.style.float = "right"; // style css

        // possibilità di annullare la richiesta di amicizia
        if (type == "waiting") {
            btn1.setAttribute("class", "btn btn-outline-danger btn-sm"); // classe specifica
            btn1.innerHTML = "Annulla"; // testo pulsante
            btn1.onclick = function() {
                // all'onclick del pulsante, annulla la richiesta di amicizia
                setRequests(userLogged, vett["Nickname"], -1); // API esterna
            }
        } else { // possibilità di richiedere l'amicizia, anche se rifiutato
            btn1.setAttribute("class", "btn btn-outline-success btn-sm"); // classe specifica
            btn1.innerHTML = "Richiedi Amicizia"; // testo pulsante
            btn1.onclick = function() {
                if (userLogged == vett["Amico"]) // se è stata rifiutata
                    newRequest(userLogged, vett["Richiedente"], true); // API esterna
                else
                    setRequests(userLogged, vett["Amico"], 0); // API esterna
            }
        }

        dNew_2.appendChild(btn1);
        rUser.appendChild(dNew_2);
    }

    if (type == "requests") { // se la sezione settiva è quelle delle richieste di amicizia
        dNew_2 = document.createElement("div");
        dNew_2.setAttribute("class", "col-4 offset-2");
        
        // primo pulsante per accettare le richieste di amicizia
        btn1 = document.createElement("button");
        btn1.setAttribute("type", "button");
        btn1.setAttribute("class", "btn btn-outline-success btn-sm");
        btn1.style.marginLeft = "35px";
        btn1.innerHTML = "Accetta"; // testo del pulsante
        btn1.onclick = function() {
            setRequests(vett["Nickname"], userLogged, 1); // API esterna
            sendMessage(userLogged, vett["Nickname"], "Request accepted", 0); // invio messaggio particolare, di controllo
        }

        // secondo pulsante per rifiutare le richieste di amicizia
        btn2 = document.createElement("button");
        btn2.setAttribute("type", "button");
        btn2.setAttribute("class", "btn btn-outline-danger btn-sm");
        btn2.style.float = "right";
        btn2.innerHTML = "Rifiuta"; // testo del pulsante
        btn2.onclick = function() {
            setRequests(vett["Nickname"], userLogged, -1); // API esterna
        }

        dNew_2.appendChild(btn1);
        dNew_2.appendChild(btn2);
        rUser.appendChild(dNew_2);
    }

    if (type == "newFriends") { // se la sezione attiva è quella per scoprire nuovi utenti
        dNew_2 = document.createElement("div");
        dNew_2.setAttribute("class", "col-3 offset-3")
        btn1 = document.createElement("button");
        btn1.setAttribute("type", "button");
        btn1.style.float = "right"; // style css
        btn1.setAttribute("class", "btn btn-outline-success btn-sm");
        btn1.innerHTML = "Chiedi Amicizia"; // testo del pulsante
        btn1.onclick = function() {
            newRequest(userLogged, vett["Nickname"], false); // API esterna
        }

        dNew_2.appendChild(btn1);
        rUser.appendChild(dNew_2);
    }

    if (type == "chats") { // se la sezione chat è attiva
        if (!vett["isDest"]) { // se l'utente loggato non è destinatario del messaggio
            spunta = "received-18dp.svg"; // spunta default
            if (vett["Letto"])
                spunta = "read-18dp.svg"; // modifica spunta se il messaggio è letto
            divLastMsg = createImage("last-message", spunta, true);
        } else {
            divLastMsg = document.createElement("div");
            divLastMsg.setAttribute("class", "last-message");
        }
    } else {
        divLastMsg = document.createElement("div");
        divLastMsg.setAttribute("class", "last-message");
    }
    
    s = document.createElement("span");
    s.style.maxWidth = "370px"; // max lunghezza del div dell'ultimo messaggio
    if (type == "chats") { // se la sezione attiva è quella della chat
        if (vett["Tipo"] == 0)
            s.innerHTML = vett["Testo"]; // testo dell'ultimo messaggio inviato
        if (vett["Tipo"] == 1) {
            s.innerHTML = vett["Testo"];
            s.style.display = "none";
            imgSend = document.createElement("img");
            imgSend.src = pathImages + "utilities/file-18dp.svg";
            divLastMsg.appendChild(imgSend);
        }

        s1 = document.createElement("span");
        s1.style.visibility = "hidden";
        s1.setAttribute("class", "IDhidden");
        s1.innerHTML = vett["ID"]; // id del messaggio, invisibile all'utente. Serve per effettuare controlli
        s.appendChild(s1);

        if (!vett["Letto"] && vett["isDest"]) { // se il messaggio non è stato e l'utente loggato non è il destinatario
            spBadge = document.createElement("span");
            spBadge.setAttribute("class", "badge badge-success");
            // spBadge.setAttribute("id", "bg-" + vett["User"]);
            spBadge.style.float = "right"; // style css
            spBadge.style.fontSize = "13px"; // style css
            spBadge.style.marginRight = "5px"; // style css
            spBadge.innerHTML = vett["numMex"]; // numero di messaggi che non sono stati letti

            divLastMsg.appendChild(spBadge);
        }
    }
    else
        s.innerHTML = vett["Bio"]; // se la sezione attiva non è quella della chat, visualizza la bio dell'utente
    divLastMsg.appendChild(s);

    div.appendChild(rUser);
    div.appendChild(divLastMsg);
    div.appendChild(document.createElement("hr")); // aggiunta una riga al termine di ogni div chat

    c.appendChild(createImage("profile-img-chat", vett["ProfileImage"], false));
    r.appendChild(c);
    r.appendChild(div);
    d.appendChild(r);

    if (type == "chats" || type == "friends") { // se la sezione attiva è quella delle chats o degli amici
        d.onclick = function() {
            if (document.getElementById("dx").innerHTML != "") {
                document.getElementById("dx").innerHTML = ""; // azzera contenuto nella sezione destra della page 
                all = document.getElementsByClassName("chat-items");
                for (i = 0; i < all.length; i++)
                    all[i].style.backgroundColor = "transparent";
            } else {
                if (vett["isDest"] && !vett["Letto"])
                    setLetto(vett["User"], userLogged); // modifica stato di lettura del messaggio
                document.getElementById(vett["User"]).style.backgroundColor = 'rgb(50, 55, 57)';
                createDxSection(vett["User"], vett["ProfileImage"], vett["Nominativo"]); // interrogazione per tutti i messaggi tra un utente e l'altro. Il parametro indica il nickname dell'utente con il quale è avvenuta la chat sulla quale è stato cliccato
            }
        }
    }
    return d;
}

// creazione messaggio, richiamata quando avviene l'invio di un nuovo mex
function createMessage(dest, vett) {
    dRow = createDiv("row spaces");
    dCol = createDiv("col-12");

    clDiv = "msg user-msg";
    clSpan = "user-msg-text";
    if (dest == vett["Destinatario"]) { // cambio classi a seconda se l'utente è destinatario o mittente
        clDiv = "msg my-msg";
        clSpan = "my-msg-text";
    }
    dMex = createDiv(clDiv);
    sp = document.createElement("span");
    sp.setAttribute("class", clSpan);
    sp.innerHTML = vett["Testo"]; // testo del messaggio

    spInv = document.createElement("sub"); // sub tag
    spInv.setAttribute("class", "invisibleDate"); // classe invisibile, usata per calcoli sulle date
    spInv.innerHTML = vett["DataMex"]; // data del messaggio, invisibile all'utente
    
    sub = document.createElement("sub"); // sub tag
    sub.setAttribute("class", "font-weight-light");
    spTime = document.createElement("span");
    spTime.style.marginRight = "3px"; // style css
    spTime.innerHTML = getOraFromData(vett["DataMex"]); // visualizzazione solo ora dalla data di invio del messaggio
    
    sub.appendChild(spTime);
    if (dest == vett["Destinatario"]) { // aggiunta di immagini, se l'utente loggato è il destinatario del messaggio
        img = document.createElement("img");
        spunta = "not_received-18dp.svg"; // default img
        if (vett["Ricevuto"])
            spunta = "received-18dp.svg";
        if (vett["Letto"])
            spunta = "read-18dp.svg";

        img.src = pathImages + "utilities/" + spunta;
        img.style.marginTop = "-5px";
        sub.appendChild(img);
    }
    
    dMex.appendChild(sp);
    dMex.appendChild(spInv);
    dMex.appendChild(sub);
    dCol.appendChild(dMex);
    dRow.appendChild(dCol);

    return dRow;
}

// visualizza date fra i veri messaggi scambiati fra gli utenti
function dataMessage(date, isDate) {
    row = document.createElement("div");
    row.setAttribute("class", "row spaces justify-content-center"); // div al centro della sezione destra della pagina
    div = document.createElement("div");
    div.setAttribute("class", "dataDiff"); // classe specifica
    sp = document.createElement("span");
    if (isDate) { // se la data non è una stringa, ma in formato date
        splitted = date.split("-");
        sp.innerHTML = splitted[2] + "/" + splitted[1] + "/" + splitted[0]; // formato della stringa visualizzata
    } else 
        sp.innerHTML = date;
    div.appendChild(sp);
    row.appendChild(div);
    
    return row;
}

// esista periodicamente per iniziare il controllo dei nuovi messaggi arrivati
function getValues() {
    active = document.getElementsByClassName("active"); // sezione attiva
    if (active[0].id == "navChats" /*&& document.getElementsByClassName("no-element").length == 0*/)
        getChatsArray(); // se la sezione attiva è quella della chats e vi è almeno un div
}

// se vi sono messaggi da nuovi utenti, che nella richiesta precedente non vi erano
function checkValue(vett, n) {
    for (i = 0; i < vett.length; i++)
        if (vett[i]["User"] == n)
            return true;
}

// tornato l'indice nel vettore dei messaggi dato id dell'utente
function findValue(vett, n) {
    for (i = 0; i < vett.length; i++)
        if (vett[i]["User"] == n)
            return i;
}

// ottenere differenze tra chats dal db e quelle scritte nel div, per verificare nuovi messaggi arrivati
function getDifferences(result, chatsJS) {
    result.forEach(elDB => {
        change = false;
        if (!checkValue(chatsJS, elDB["User"])) { // nel caso vi sia un messaggio da un nuovo utente
            change = true;
            indChanges.push(elDB["User"]); // aggiunto id al vettore
        } else {
            // se l'id dell'ultimo mex con un utente non corrisponde, significa che sono stati inviati altri messagggi 
            if (chatsJS[findValue(chatsJS, elDB["User"])]["ID"] != elDB["ID"])
                change = true;
        }

        if (change) { // se sono stati notati dei cambiamenti
            wh = document.getElementById("chats"); // sezione sinistra della page
            if (document.getElementById(elDB["User"]) != undefined)
                wh.removeChild(document.getElementById(elDB["User"])); // rimosso div dato id

            if (elDB["Testo"] == "Request accepted") {
                deleteMessage(elDB["ID"], elDB["User"], getDateNow(), "requestAccepted");
            } else {
                // se si tratta di un messaggio
                wh.prepend(createChatItem(elDB, "chats")); // aggiunto all'inizio della sezione, il nuovo div che rappresenta il messaggio appena ricevuto
                stored = JSON.parse(localStorage.getItem("messages")); // recupera vettore dal local storage
                stored.push(elDB); // aggiunto al vettore, il messaggio appena ricevuto
                localStorage.setItem("messages", JSON.stringify(stored)); // set local storage con il vettore appena aggiornato
            }
            console.log("CHANGE");
        } else
            console.log("Nessun cambiamento!");
    });
}

function searchMessage() {
    document.getElementById("dx").innerHTML = ""; // sezione a dx eliminata
    mex = document.getElementById("searchBar").value;
    if (mex == "") {
        document.getElementById("chats").innerHTML = "";
        getChats();
        setInterval(getValues, 2000);
    } else {
        stored = JSON.parse(localStorage.getItem("messages")); // vettore memorizzato nel local storage

        usersFound = [];
        // cerca fra gli utenti
        users = document.getElementsByClassName("chat-items"); // vettore di tutti gli utenti presenti nel div
        for (var ind = 0; ind < users.length; ind++) {
            if (users[ind].getAttribute("nome").toLowerCase().includes(mex)) {
                usersFound.push(users[ind]); 
            }
        }

        chatsFound = [];
        // cerca tra i messaggi
        stored.forEach(element => {
            if (element["Testo"].includes(mex)) {
                y = "Mittente";
                if (element["Mittente"] == userLogged)
                    y = "Destinatario";
                for (var ind = 0; ind < users.length; ind++) {
                    if (element[y] == users[ind].id) {
                        chatsFound.push({"div": users[ind], "ID": element["ID"], "Testo": element["Testo"]});
                    }
                }
            }
        });
        displaySearched(mex, usersFound, chatsFound);
    }
}

// mostra i risultati della ricerca nelle sezione a sx della chat
function displaySearched(sea, us, mex) {
    clearInterval(timerChats); // stop polling al server, per nuovi messaggi

    wh = document.getElementById("chats"); // div dove aggiungere i risultati delle ricerche
    wh.innerHTML = ""; // contenuto azzerato

    if (us.length != 0) { // se è stato trovato almeno un utente
        dUs = document.createElement("div"); // div per gli utenti
        dUs.appendChild(createTitle("CHATS")); // titolo div

        dUs.onclick = function() {
            // click sul div che è stato trovato dalla ricerca
            document.getElementById("chats").innerHTML = ""; // div chats azzerato
            
            getChats(); // get di tutte le chats
            setInterval(getValues, 2000); // polling al database
            document.getElementById("searchBar").value = "";
        }
        wh.appendChild(dUs);
    }
    if (mex.length != 0) { // se è stato trovato almeno un messaggio
        if (us.length != 0) // se presente almeno un utente
            wh.appendChild(document.createElement("br")); // aggiungi linea di spaziatura
        dMex = document.createElement("div");
        dMex.setAttribute("id", "mex");
        dMex.appendChild(createTitle("MESSAGGI")); // titolo div

        wh.appendChild(dMex);
    }

    var a;
    if (mex.length != 0) {
        for (ind = 0; ind < mex.length; ind++) {
            txt = mex[ind]["Testo"];
            valueDiv = mex[ind]["div"].getElementsByClassName("last-message")[0].getElementsByTagName("span")[0].innerHTML.split("<span");
            
            splitted = txt.split(" ");
            var newArr = [];
            for (i = 0; i < splitted.length; i++) {
                if (splitted[i].indexOf(sea) >= 0) {
                    newArr.push(i);
                }
            }
            str = "";
            for (j = 0; j < newArr.length; j++) {
                if (j == 0)
                    a =0;
                str += splitted.slice(a, newArr[j]).join(" ") + " ";
                str += "<span style='color: green; font-weight: bold;'>" + splitted[newArr[j]] + "</span> ";
                a = newArr[j] + 1;
            }
            str += splitted.slice(a).join(" ");
            str += "<span" + valueDiv[1]; // set the id del mex cercato e trovato

            clone = mex[ind]["div"].cloneNode(true);
            clone.getElementsByClassName("last-message")[0].getElementsByTagName("span")[0].innerHTML = str;
            clone.onclick = function() {
                profileStr = clone.getElementsByTagName("img")[0].src.split('/');
                profile = profileStr[profileStr.length - 1];
                createDxSection(clone.id, profile, clone.getAttribute("nome"));
                setScroll(clone.getElementsByClassName("last-message")[0].getElementsByClassName("IDhidden")[0].innerHTML);
            }
            dMex.appendChild(clone);
        }
    }

    if (us.length != 0) {
        for (var ind = 0; ind < us.length; ind++) {
            us[ind].firstChild.setAttribute("class", "row searched");
            dUs.appendChild(us[ind]);
        }
    }

    if (us.length == 0 && mex.length == 0) { // nel caso in cui non siano stati trovati ne utenti e ne messaggi
        d = document.createElement("div"); // div per gli utenti
        d.style.textAlign = "center"; // style css
        p = document.createElement("p"); // testo
        p.style.color = "grey"; // style css
        p.innerHTML = "Nessuna chat o messaggi trovati"; // contenuto del testo

        d.appendChild(p);
        wh.appendChild(d);
    }
}

// creato titolo, passato come parametro
function createTitle(title) {
    h6 = document.createElement("h6");
    h6.innerHTML = title;
    h6.style.marginBottom = "20px"; // style css
    h6.style.color = "green"; // colore testo trovato

    return h6;
}

function closeSearchMex() {
    document.getElementById("divLateral").remove();
    document.getElementById("dx").setAttribute("class", "col-lg-8 right");
}

function searchMexChat(nome, dest) {
    document.getElementById("dx").setAttribute("class", "col-lg-5 right");

    div = document.createElement("div");
    div.setAttribute("class", "col-lg-3 left");
    div.setAttribute("id", "divLateral");

    row = document.createElement("div");
    row.setAttribute("class", "row icons");
    row.style.height = document.getElementsByClassName("row icons")[0].offsetHeight + "px";

    dIcons = document.createElement("div");
    dIcons.setAttribute("class", "utility-icons");
    img = document.createElement("img");
    img.style.marginLeft = "10px";
    img.onclick = closeSearchMex;
    img.src = pathImages + "utilities/" + "clear-24dp.svg"; // img per cercare messaggi inviati solo in quella chat
    
    sp = document.createElement("sp");
    sp.style.color = "white";
    sp.innerHTML = "Cerca messaggi";
    dIcons.appendChild(img);
    dIcons.appendChild(sp);

    divCont = document.createElement("div");
    divCont.setAttribute("class", "row search-bar");
    divCont.setAttribute("id", "formSearchMex");
    divCol = document.createElement("div");
    divCol.setAttribute("class", "col-12 form-group");
    inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("class", "form-control form-control-sm input-text");
    inp.setAttribute("id", "searchMexChat");
    inp.placeholder = "Cerca...";
    inp.onchange = function() { foundMexs(dest); };

    colMexs = document.createElement("div");
    colMexs.setAttribute("class", "col-12");
    colMexs.style.color = "white";
    colMexs.style.textAlign = "center";
    spa = document.createElement("span");
    spa.innerHTML = "Cerca messaggi con " + nome;
    colMexs.appendChild(spa);
    
    divCol.appendChild(inp);
    divCont.appendChild(divCol);
    divCont.appendChild(document.createElement("br"));
    divCont.appendChild(document.createElement("br"));
    divCont.appendChild(colMexs);
    
    row.appendChild(dIcons);
    div.appendChild(row);
    div.appendChild(divCont);
    document.getElementById("page").appendChild(div);
    inp.focus();
}

function foundMexs(dest) {
    mex = document.getElementById("searchMexChat").value;
    wh = document.getElementById("formSearchMex");
    wh.innerHTML = "";
    
    stored = JSON.parse(localStorage.getItem("messages")); // vettore memorizzato nel local storage
    for (ind = stored.length - 1; ind >= 0; ind--) {
        if ((stored[ind]["Mittente"] == userLogged && stored[ind]["Destinatario"] == dest) || (stored[ind]["Mittente"] == dest && stored[ind]["Destinatario"] == userLogged)) {
            if (stored[ind]["Testo"].includes(mex)) {
                div = document.createElement("div");
                div.setAttribute("class", "col-12 mex-items");
                div.setAttribute("onclick", "setScroll('" + stored[ind]["ID"] + "')");
                
                sp1 = document.createElement("span");
                sub = document.createElement("sub");
                sp1.style.display = "block";
                sub.style.color = "white";

                diffTime = Math.abs(new Date(stored[ind]["DataMex"].split(' ')[0]) - new Date());
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays == 1)
                    y = stored[ind]["DataMex"].split(" ")[1].split(":").slice(0, 2).join(":");
                else if (diffDays == 2)
                    y = "Ieri"
                else {
                    d = stored[ind]["DataMex"].split(" ")[0].split("-");
                    y = d[2] + "/" + d[1] + "/" + d[0];
                }
                sub.innerHTML = y;
                
                sp1.appendChild(sub);
                sp2 = document.createElement("span");
                sp2.style.color = "white";
                
                splitted = stored[ind]["Testo"].split(" ");
                var newArr = [];
                str = "";
                for (i = 0; i < splitted.length; i++) {
                    if (splitted[i].indexOf(mex) >= 0) {
                        newArr.push(i);
                    }
                }
                
                for (j = 0; j < newArr.length; j++) {
                    if (j == 0)
                        a =0;
                    str += splitted.slice(a, newArr[j]).join(" ") + " ";
                    str += "<span style='color: green; font-weight: bold;'>" + splitted[newArr[j]] + "</span> ";
                    a = newArr[j] + 1;
                }
                str += splitted.slice(a).join(" ");
                str += "<span style="
                sp2.innerHTML = str;
                
                div.appendChild(sp1);
                div.appendChild(sp2);
                div.appendChild(document.createElement("hr"));
                wh.appendChild(div);
            }
        }
    }
}

// posiziona lo scrollbar ad una altezza precisa, in base al 
function setScroll(idMex) {
    mexs = JSON.parse(localStorage.getItem("messages"));
    var ind = mexs.findIndex(obj => obj.ID === parseInt(idMex));
    scrollBar = document.getElementsByClassName("container")[0];
    scrollBar.scrollTo(0, ind * 30);
}