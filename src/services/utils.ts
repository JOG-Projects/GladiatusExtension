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
    var tabId = await getFromStorage<number>("tabId");
    let details: chrome.tabs.InjectDetails = { file: `${file}.js` };
    chrome.tabs.executeScript(tabId, details);
    await promisifyExecute(file);
}

export async function getFromStorage<T>(key: string): Promise<T> {
    let value = await new Promise<any>(resolve => chrome.storage.sync.get(key, value => resolve(value)))
    return value[key] as T
}

export async function setStorage(key: string, value: any): Promise<void> {
    let obj = {} as IMessage
    obj[key] = value

    await chrome.storage.sync.set(obj)
}

export async function timeout(ms: number): Promise<void> {
    await new Promise<void>(resolve => window.setTimeout(resolve, ms))
}

export function tomorrowMidnight(): number {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

export function getByXpath<T extends Node>(xpath: string): T {
    let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null,).singleNodeValue;
    if (!element) {
        throw new Error(`Element ${element} wasn't found`);
    }
    return element as T
}

export function clickAndWait(xpath: string): void {
    let botao = getByXpath<HTMLButtonElement>(xpath);
    botao.click();
}

export async function log(level: TipoLog, message: string): Promise<void> {
    await chrome.runtime.sendMessage({ type: "log", log: { level: level, message: message } })
}

export async function logError(e: any): Promise<void> {
    await log(TipoLog.erro, `${e}`)
}

export async function doWork(file: string, work: () => Promise<void>) {
    try {
        await work();
    } catch (e) {
        await logError(e);
    }
    finally {
        await resolvePromise(file);
    }
}

export async function registerListeners(elements: { id: string, default: any }[]) {
    for (let element of elements) {
        let html = document.getElementById(element.id) as HTMLInputElement;
        let newValue = (await getFromStorage<any>(element.id)) ?? element.default;
        html.onchange = async () => await setStorage(element.id, html.value)
        html.value = newValue;
    }
}

async function promisifyExecute(file: string) {
    await new Promise<void>(resolve => {
        let listener = async (message: { type: string }) => {
            if (message.type === file) {
                chrome.runtime.onMessage.removeListener(listener);
                resolve();
            }
        }
        chrome.runtime.onMessage.addListener(listener);
    }
    );
}

async function resolvePromise(file: string) {
    await chrome.runtime.sendMessage({ type: file });
}