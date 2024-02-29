document.addEventListener('DOMContentLoaded', function() {
    const btnSummarise = document.getElementById("summarise");
    const btnTranslate = document.getElementById("translate");
    const btnListen = document.getElementById("listen");
    const output = document.getElementById("output");
    const videoUrlInput = document.getElementById("videoUrl");

    btnSummarise.addEventListener("click", function() {
        console.log("Summarise button clicked");
        var url = videoUrlInput.value;
        if (!url) {
            alert("Please enter a valid YouTube Video URL.");
            return;
        }

        btnSummarise.disabled = true;
        btnSummarise.innerHTML = "Summarising...";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:9989/summary?url=" + url, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            output.innerHTML = text;
            btnSummarise.disabled = false;
            btnSummarise.innerHTML = "Summarise";
        }
        xhr.send();
    });

    btnTranslate.addEventListener("click", function() {
        console.log("Translate button clicked");
        var textToTranslate = output.innerText;
        if (!textToTranslate) {
            alert("No text to translate. Please summarize a video first.");
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:9989/translate", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            var translatedText = xhr.responseText;
            output.innerHTML = translatedText;
        }
        xhr.send("text=" + encodeURIComponent(textToTranslate));
    });

    btnListen.addEventListener("click", function() {
        console.log("Listen button clicked");
        var textToListen = output.innerText;
        if (!textToListen) {
            alert("No text to listen. Please summarize a video first.");
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:9989/listen", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            alert("Voice generated");
        }
        xhr.send("text=" + encodeURIComponent(textToListen));
    });
});
