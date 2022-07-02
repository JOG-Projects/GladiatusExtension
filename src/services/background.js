import { getFromStorage, setStorage } from "./background_utils.js";
import { main } from "./main.js";

chrome.runtime.onMessage.addListener(handleMessage);

chrome.alarms.onAlarm.addListener(handleAlarm);

// chrome.runtime.onStartup.addListener(initAlarm) Para registrar os alarmes ao iniciar o navegador.

async function initAlarm() {
  let atkCooldown = (await getFromStorage("atkCooldown")) ?? 25;
  let ultima_run = (await getFromStorage("ultimaRunCompleta")) ?? new Date();
  let qtd_atk = (await getFromStorage("qtdAtks")) ?? 0;

  if (qtd_atk == 5) {
    await clearAlarm("atkRun");
    await createAlarm("atkRun", ultima_run.tomorrowStart());
    await setStorage("qtdAtks", 0);
    return;
  }

  await createAlarm("atkRun", ultima_run.);
}

function createAlarm(alarmName, date, cooldown) {
  return new Promise((resolve, reject) => {
    chrome.alarms.create(
      alarmName,
      {
        periodInMinutes: cooldown,
        when: date,
      },
      resolve
    );
  });
}

function clearAlarm(alarmName) {
  return new Promise((resolve, reject) => {
    chrome.alarms.clear(alarmName, resolve);
  });
}

function handleAlarm(alarm) {
  if (alarm.name == "atkRun") {
    run();
  }
}

function handleMessage(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log("request type: " + request.type);

  if (request.type === "config")
    chrome.tabs.create({ url: "./view/config.html", selected: true });

  if (request.type === "start") {
    start();
  }

  sendResponse();
}

function start() {
  run();

  initAlarm();
}

function run() {
  chrome.tabs.query(
    { url: "https://*.gladiatus.gameforge.com/*" },
    async (tabs) => {
      if (tabs.length > 1) {
        console.error("More than one gladiatus tabs are open");
        return;
      }

      let tab = tabs[0];

      if (tab == false) {
        console.error("Cant find gladiatus tab");
        return;
      }

      console.log("Found tab id: " + tab.id);

      await setStorage("tabId", tab.id);

      await main();
    }
  );
}
