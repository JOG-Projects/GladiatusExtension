const button_run = document.getElementById("start") as HTMLButtonElement;
const button_config = document.getElementById("config") as HTMLButtonElement;

button_config.onclick = () => {
    chrome.runtime.sendMessage({ type: "config" });
}

button_run.onclick = () => {
    chrome.runtime.sendMessage({ type: "start" });
}