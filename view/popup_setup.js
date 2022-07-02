const button_run = document.getElementById("run")
const button_config = document.getElementById("config")

button_config.onclick = () => {
    chrome.runtime.sendMessage({ type: "config" });
}

button_run.onclick = () => {
    chrome.runtime.sendMessage({ type: "start" });
}