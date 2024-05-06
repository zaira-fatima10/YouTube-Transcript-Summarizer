document.addEventListener('DOMContentLoaded', function() {
    const btnSummarise = document.getElementById("summarise");
    const btnTranslate = document.getElementById("translate");
    const btnTranslateGuj = document.getElementById("translate_guj");
    const btnTranslateUrdu = document.getElementById("translate_urdu");
    const btnListen = document.getElementById("listen");
    const btnDownload = document.getElementById("download");
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

btnTranslateGuj.addEventListener("click", function() {
    console.log("Translate to Gujarati button clicked");
    var textToTranslate = output.innerText;
    if (!textToTranslate) {
        alert("No text to translate. Please summarize a video first.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:9989/translate_guj", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        var translatedText = xhr.responseText;
        output.innerHTML = translatedText;
    }
    xhr.send("text=" + encodeURIComponent(textToTranslate));
});

btnTranslateUrdu.addEventListener("click", function() {
    console.log("Translate to Urdu button clicked");
    var textToTranslate = output.innerText;
    if (!textToTranslate) {
        alert("No text to translate. Please summarize a video first.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:9989/translate_urdu", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        var translatedText = xhr.responseText;
        output.innerHTML = translatedText;
    }
    xhr.send("text=" + encodeURIComponent(textToTranslate));
});

btnDownload.addEventListener("click", function() {
    console.log("Download button clicked");
    var textToDownload = output.innerText;
    if (!textToDownload) {
        alert("No text to download. Please summarize a video first.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:9989/download", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = 'blob'; // Set the response type to blob for file download
    xhr.onload = function() {
        var blob = xhr.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'transcript.txt';
        link.click();
    }
    xhr.send("text=" + encodeURIComponent(textToDownload));
});
});
