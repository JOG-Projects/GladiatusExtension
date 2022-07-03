import { TipoLog } from "./model/tipoLog";

export async function tryUntil(action: () => Promise<void>): Promise<void> {
    try {
        await action();
    } catch
    {
        await timeout(200);
        await tryUntil(action);
    }
}

export async function execute(file: string): Promise<void> {
    var tabId = await getFromStorage("tabId");
    await new Promise<any[]>(function (resolve, reject) {
        let sexo = {
            tabId: tabId,
            file: file
        };
        chrome.tabs.executeScript(sexo, resolve)
    });
}

export function getFromStorage<T>(key: string): Promise<T> {
    return new Promise<T>(function (resolve) {
        chrome.storage.sync.get(key, (value) => resolve(value[key] as T))
    });
}

export async function setStorage(key: string, value: any): Promise<void> {
    await new Promise<void>(function (resolve) {
        let obj = {} as IMessage
        obj[key] = value
        chrome.storage.sync.set(obj, resolve)
    });
}

export async function timeout(ms: number): Promise<void> {
    await new Promise<void>(resolve => setTimeout(resolve, ms))
}

export function createAlarm(alarmName: string, unixTime: number, minutesCooldown: number): void {
    let alarmInfo: chrome.alarms.AlarmCreateInfo = {
        periodInMinutes: minutesCooldown,
        when: unixTime
    };
    chrome.alarms.create(alarmName, alarmInfo);
}

export function tomorrowMidnight(): number {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

export function getByXpath<T>(xpath: string): T {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null,).singleNodeValue as T
}

export async function clickAndWait(xpath: string, ms?: number): Promise<void> {
    let botao = getByXpath<HTMLButtonElement>(xpath);
    botao.click();
    await timeout(ms ?? 0);
}

export async function log(nivel: TipoLog, mensagem: string): Promise<void> {
    await new Promise<void>(function (resolve, reject) {
        chrome.runtime.sendMessage(log, resolve)
    });
}

export async function logError(e: any): Promise<void> {
    await log(TipoLog.erro, `${e}`)
}