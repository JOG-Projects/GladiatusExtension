export async function execute(file: string) {
    var tabId = await getFromStorage("tabId");
    await new Promise(function (resolve, reject) {
        let sexo = {
            tabId: tabId,
            file: file
        };
        chrome.tabs.executeScript(sexo, resolve)
    });
}

export function getFromStorage(key: string) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, (value) => resolve(value[key]))
    });
}

export function setStorage(key: string, value: any) {
    return new Promise(function (resolve, reject) {
        let obj = {}
        obj[key] = value
        chrome.storage.sync.set(obj, resolve)
    });
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function createAlarm(alarmName: string, unixTime: number, minutesCooldown: number) {
    return new Promise<void>((resolve) => {
        chrome.alarms.create(alarmName, {
            periodInMinutes: minutesCooldown,
            when: unixTime,
        });
        resolve()
    });
}

export function tomorrowMidnight() {
    let date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(0, 0, 0, 0)
    return date.getTime();
}