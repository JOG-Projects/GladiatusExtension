import { IMessage } from "../model/infra/IMessage";
import { Indexable } from "../model/infra/Indexable";
import { TipoLog } from "../model/infra/tipoLog";

export async function tryUntil<T>(action: () => Promise<T>): Promise<T> {
    try {
        return await action();
    } catch (e: any) {
        await log(TipoLog.erro, e.message)
        await timeout(200);
        return await tryUntil(action);
    }
}

export async function execute(file: string): Promise<void> {
    while (true) {
        let tabId = await getFromStorage<number>("tabId");
        let details: chrome.tabs.InjectDetails = { file: `${file}.js` };
        await new Promise<any[]>(resolve => chrome.tabs.executeScript(tabId, details, resolve));

        if ((await getFromStorage<boolean>("result")) === true) {
            return;
        }
        
        await timeout(200);
    }
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
    await new Promise<void>(resolve => setTimeout(resolve, ms))
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

export async function doWorkLegado(sexo: string, work: () => Promise<void>) {
    (async () => {
        try {
            await tryUntil(work);
        } catch (e) {
            await logError(e);
        }
    })();
}

export async function resolvePromise(file: string) {
    await chrome.runtime.sendMessage({ type: file });
}

export async function registerListeners(elements: { id: string, default: any, value: string }[]) {
    for (let element of elements) {
        await log(TipoLog.info, `id:${element.id} value:${element.value} default:${element.default}`)
        let html = document.getElementById(element.id) as Indexable;
        let newValue = (await getFromStorage<any>(element.id)) ?? element.default;
        html.onchange = async () => await setStorage(element.id, html[element.value])
        await setStorage(element.id, newValue)
        html[element.value] = newValue;
    }
}

export function doubleClick(comida: Element) {
    const dbClickEvent = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: false
    });

    comida.dispatchEvent(dbClickEvent);
}

export function doWork(work: () => Promise<void>) {
    (async () => {
        try {
            await work();
            await setStorage("result", true)
        } catch (e: any) {
            await log(TipoLog.erro, e.message);
            await setStorage("result", false);
        }
    })();
}

async function promisifyExecute(messageCallback: string) {
    await new Promise<void>(resolve => {
        let listener = async (message: { type: string }) => {
            if (message.type === messageCallback) {
                chrome.runtime.onMessage.removeListener(listener);
                resolve();
            }
        }
        chrome.runtime.onMessage.addListener(listener);
    }
    );
}

export function gerarDrops(): string {
    let lut: string[] = [];
    for (let i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
    }

    function e7() {
        let d0 = Math.random() * 0xffffffff | 0;
        let d1 = Math.random() * 0xffffffff | 0;
        let d2 = Math.random() * 0xffffffff | 0;
        let d3 = Math.random() * 0xffffffff | 0;

        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }

    return e7();
}