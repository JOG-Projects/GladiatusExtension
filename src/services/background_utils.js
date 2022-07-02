export async function execute(file) {
    var tabId = await getFromStorage("tabId");
    await new Promise(function (resolve, reject) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['src/injected/injected_utils.js', file]
            }, resolve)
    });
}

export function getFromStorage(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, (value) => resolve(value[key]))
    });
}

export function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        let obj = {}
        obj[key] = value
        chrome.storage.sync.set(obj, resolve)
    });
}

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function createAlarm(alarmName, unixTime, minutesCooldown) {
    return new Promise((resolve, reject) => {
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