function getByXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null,).singleNodeValue
}

async function timeout(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function clickAndWait(xpath, ms) {
    getByXpath(xpath).click();
    await timeout(ms ?? 0)
}

async function getFromStorage(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, (value) => resolve(value[key]));
    });
}

async function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        let obj = {}
        obj[key] = value
        chrome.storage.sync.set(obj, resolve());
    });
}