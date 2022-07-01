export async function execute(file) {
    var tabId = await getFromStorage("tabId");
    return new Promise(function (resolve, reject) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['src/injected/injected_utils.js', file]
            }, resolve());
    });
}

export function getFromStorage(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, (value) => resolve(value[key]));
    });
}

export function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        let obj = {}
        obj[key] = value
        chrome.storage.sync.set(obj, resolve());
    });
}

export async function timeout(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}