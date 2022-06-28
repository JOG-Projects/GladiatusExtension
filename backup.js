

var comprarComida = $('#comprarComida')
chrome.storage.local.get('comprarComida', function (result) {
    comprarComida[0].checked = result.comprarComida
})
comprarComida[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'comprarComida': comprarComida[0].checked }, null);
})

configuracoes.addEventListener('change', function (event) {
    chrome.storage.local.get(null, function (items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
    });

    chrome.tabs.query({
        active: true,
        currentWindow: true,
    }, tabs => {
        tabId = tabs[0].id;
        tabUrl = tabs[0].url;
        console.log("_________ Configurações Tab: " + tabId + " _________")
        console.log(tabs[0])


        arrayConfiguracoes = [{
            tabId: tabId,
            onOff: onOff[0].checked,
            arena: arena[0].checked,
            circus: circus[0].checked,
            espedicao: espedicao[0].checked,
            masmorra: masmorra[0].checked,
            comer: comer[0].checked,
            minLife: minLife[0].value,
            minDelay: minDelay[0].value,
            maxDelay: maxDelay[0].value,
            maxConsecultivos: maxConsecultivos[0].value,
            fazerArena: fazerArena[0].checked,
            fazerGoupArena: fazerGoupArena[0].checked,
            fazerCombate: fazerCombate[0].checked,
            tipoMasmorra: tipoMasmorra[0].checked,
            bonusBoss: bonusBoss[0].checked,
            comprarComida: comprarComida[0].checked,
        }
        ]
        //Gravar ( SET )
        var key = {}
        key[tabId] = arrayConfiguracoes
        chrome.storage.local.set(key, null);

        //Ler ( GET )
        var keyload = {}
        keyload[tabId] = tabId.toString()
        chrome.storage.local.get(keyload[tabId], function (result) { console.log(result) })

    })
})

chrome.storage.local.get('configuracoes', function (result) {
    onOff[0].checked = result.configuracoes[0].onOff
    arena[0].checked = result.configuracoes[0].arena
    circus[0].checked = result.configuracoes[0].circus
    espedicao[0].checked = result.configuracoes[0].espedicao
    masmorra[0].checked = result.configuracoes[0].masmorra
    comer[0].checked = result.configuracoes[0].comer
    minLife[0].value = result.configuracoes[0].minLife
    minDelay[0].value = result.configuracoes[0].minDelay
    maxDelay[0].value = result.configuracoes[0].maxDelay
    maxConsecultivos[0].value = result.configuracoes[0].maxConsecultivos
    fazerArena[0].checked = result.configuracoes[0].fazerArena
    fazerGoupArena[0].checked = result.configuracoes[0].fazerGoupArena
    fazerCombate[0].checked = result.configuracoes[0].fazerCombate
    tipoMasmorra[0].checked = result.configuracoes[0].tipoMasmorra
    bonusBoss[0].checked = result.configuracoes[0].bonusBoss
    comprarComida[0].checked = result.configuracoes[0].comprarComida

})




