const inputPlayers = document.getElementById("atkListPlayers")


chrome.storage.sync.get("atkListPlayers", (value) => inputPlayers.value = value.atkListPlayers ?? "");

inputPlayers.onchange = () => {
    chrome.storage.sync.set({ atkListPlayers: inputPlayers.value });
}