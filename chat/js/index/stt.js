// work only on Chrome and in English

class speechRecognition {
    constructor(opt) {
        const speechToText = window.SpeechRecognition || window.webkitSpeechRecognition;

        this.speechAPI = new speechToText();
        this.output = opt;
        this.speechAPI.continous = true;
        this.speechAPI.interimResult = false;
        this.speechAPI.onresult = (event) => {
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;
            this.output.value += transcript; // write what has been recognized
        }
    }

    start() {
        this.speechAPI.start();
    }

    stop() {
        this.speechAPI.stop();
    }
}

var speechToText;

function startRec() {
    out = document.getElementById("sendMex"); // input text where user digits messages has been sent
    speechToText = new speechRecognition(out);
    speechToText.start(); // start speech recognition
    out.focus(); // focus active on input text
}

function stopRec() {
    speechToText.stop(); // stop speech recognition
}