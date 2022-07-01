import { main } from "./main.js";
import { setStorage } from "./background_utils.js"

chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log("request type: " + request.type)

    if (request.type === "config")
        chrome.tabs.create({ 'url': 'view/config.html', 'selected': true });

    if (request.type === "run") {
        run();
    }

    sendResponse()
}

function run() {
    chrome.tabs.query({ url: "https://s17-pt.gladiatus.gameforge.com/*" }, async (tabs) => {
        if (tabs.lenght > 1) {
            console.error("More than one gladiatus tabs are open")
            return;
        }

        let tab = tabs[0];

        if (tab == false) {
            console.error("Cant find gladiatus tab")
            return;
        }

        console.log("Found tab id: " + tab.id)

        await setStorage("tabId", tab.id)

        await main()
    });
}