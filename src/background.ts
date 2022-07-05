import { execute, setStorage } from "./services/utils";
import { TipoLog } from "./services/model/tipoLog";
import { initAttackPlayers } from "./services/controllers/atkPlayers";

chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(request: IMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): Promise<void> {
    console.log(`Message: ${request.type}`);

    if (request.type === "config")
        chrome.tabs.create({ url: "config.html", selected: true });

    if (request.type === "start") {
        await start();
    }

    if (request.type === "log") {
        let log = request["log"] as { level: TipoLog, message: string };
        let output = log.level == TipoLog.info ? console.log : console.error;
        output(log.message)
    }

    sendResponse();
}

async function start(): Promise<void> {
    await setTabId()

    //await equiparPreset()

    await initAttackPlayers()
}

async function setTabId(): Promise<void> {
    let query: chrome.tabs.QueryInfo = { url: "https://*.gladiatus.gameforge.com/*" };
    let tabs = await new Promise<chrome.tabs.Tab[]>(resolve => chrome.tabs.query(query, resolve));

    if (tabs.length > 1) {
        throw "More than one gladiatus tabs are open";
    }

    let tab = tabs[0];
    if (!tab) {
        throw "Cant find gladiatus tab";
    }

    console.log(`Found tab id: ${tab.id}`)

    await setStorage("tabId", tab.id);
}
