function getByXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null,).singleNodeValue
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickAndWait(xpath, ms) {
    getByXpath(xpath).click();
    await timeout(ms ?? 0)
}

function getFromStorage(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, (value) => resolve(value[key]));
    });
}

function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        let obj = {}
        obj[key] = value
        chrome.storage.sync.set(obj, resolve);
    });
}

function log(log) {
    return new Promise((resolve, reject) => chrome.runtime.sendMessage("GTB", log, null, resolve));
}