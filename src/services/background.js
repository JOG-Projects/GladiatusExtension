import { initAlarms, handleAlarm } from "./alarms.js";
import { setStorage } from "./background_utils.js";
import { equiparPreset } from "./objectives/equiparPreset.js";

chrome.runtime.onMessage.addListener(handleMessage);

chrome.alarms.onAlarm.addListener(handleAlarm);

// chrome.runtime.onStartup.addListener(initAlarm) Para registrar os alarmes ao iniciar o navegador.

async function handleMessage(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log("request type: " + request.type);

    if (request.type === "config")
        chrome.tabs.create({ url: "./view/config.html", selected: true });

    if (request.type === "start") {
        await start();
    }

    sendResponse();
}

async function start() {
    await setTabId()

    //await equiparPreset()

    await initAlarms();
}

async function setTabId() {
    let tabs = await new Promise((resolve, reject) => {
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
