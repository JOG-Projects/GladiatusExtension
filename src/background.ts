import { initAlarms, handleAlarm } from "./services/alarms.js";
import { setStorage } from "./services/background_utils.js";

chrome.runtime.onMessage.addListener(handleMessage);

chrome.alarms.onAlarm.addListener(handleAlarm);

// chrome.runtime.onStartup.addListener(initAlarm) Para registrar os alarmes ao iniciar o navegador.

async function handleMessage(request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log("request type: " + request.type);

    if (request.type === "config")
        chrome.tabs.create({ url: "./view/config.html", selected: true });

    if (request.type === "start") {
        await start();
    }

    if (request.type === "info") {
        console.log(request.message)
    }

    if (request.type === "error") {
        console.error(request.message)
    }

    sendResponse();
}

async function start() {
    await setTabId()

    //await equiparPreset()

    await initAlarms();
}

async function setTabId() {
    let tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
        chrome.tabs.query({ url: "https://*.gladiatus.gameforge.com/*" }, (tabs) => resolve(tabs))
    });

    if (tabs.length > 1) {
        throw "More than one gladiatus tabs are open";
    }

    let tab = tabs[0];
    if (!tab) {
        throw "Cant find gladiatus tab";
    }

    console.log(`"Found tab id: ${tab.id}`)

    await setStorage("tabId", tab.id);
}
