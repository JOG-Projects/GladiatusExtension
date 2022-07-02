export async function execute(file) {
    var tabId = await getFromStorage("tabId");
    return new Promise(function (resolve, reject) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['src/injected/injected_utils.js', file]
            }, resolve())
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
        chrome.storage.sync.set(obj, resolve())
    });
}

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

Date.prototype.tomorrowStart = () => {
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + 1)
    date.setHours(0,0,0,0)
    return date;
}

 Date.prototype.addMinutes = function (minutes) {
    let date = new Date(this.valueOf())
    return new Date(date.getTime() + minutes * 60000);
}