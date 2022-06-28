var onOff = $('#onOff')
chrome.storage.local.get('onOff', function (result) {
    onOff[0].checked = result.onOff
})

onOff[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'onOff': onOff[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var arena = $('#arena')
chrome.storage.local.get('arena', function (result) {
    arena[0].checked = result.arena
})

arena[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'arena': arena[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var circus = $('#circus')
chrome.storage.local.get('circus', function (result) {
    circus[0].checked = result.circus
})

circus[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'circus': circus[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var espedicao = $('#espedicao')
chrome.storage.local.get('espedicao', function (result) {
    espedicao[0].checked = result.espedicao
})

espedicao[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'espedicao': espedicao[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var masmorra = $('#masmorra')
chrome.storage.local.get('masmorra', function (result) {
    masmorra[0].checked = result.masmorra
})

masmorra[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'masmorra': masmorra[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var comer = $('#comer')
chrome.storage.local.get('comer', function (result) {
    comer[0].checked = result.comer
})

comer[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'comer': comer[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var minLife = $('#minLife')
chrome.storage.local.get('minLife', function (result) {
    minLife[0].value = result.minLife
})

minLife[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'minLife': minLife[0].value }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var minDelay = $('#minDelay')
chrome.storage.local.get('minDelay', function (result) {
    minDelay[0].value = result.minDelay
})

minDelay[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'minDelay': minDelay[0].value }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var maxDelay = $('#maxDelay')
chrome.storage.local.get('maxDelay', function (result) {
    maxDelay[0].value = result.maxDelay
})

maxDelay[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'maxDelay': maxDelay[0].value }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var minFood = $('#minFood')
chrome.storage.local.get('minFood', function (result) {
    minFood[0].value = result.minFood
})

minFood[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'minFood': minFood[0].value }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var maxConsecultivos = $('#maxConsecultivos')
chrome.storage.local.get('maxConsecultivos', function (result) {
    maxConsecultivos[0].value = result.maxConsecultivos
})

maxConsecultivos[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'maxConsecultivos': maxConsecultivos[0].value }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var fazerArena = $('#fazerArena')
fazerArena[0].addEventListener('change', function (event) {
    muda(fazerArena[0].checked, 'icon_arena')
})

chrome.storage.local.get('fazerArena', function (result) {
    fazerArena[0].checked = result.fazerArena
    muda(result.fazerArena, 'icon_arena')
})

fazerArena[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'fazerArena': fazerArena[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var fazerGoupArena = $('#fazerGoupArena')
fazerGoupArena[0].addEventListener('change', function (event) {
    muda(fazerGoupArena[0].checked, 'icon_grouparena')
})

chrome.storage.local.get('fazerGoupArena', function (result) {
    fazerGoupArena[0].checked = result.fazerGoupArena
    muda(result.fazerGoupArena, 'icon_grouparena')
})

fazerGoupArena[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'fazerGoupArena': fazerGoupArena[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var fazerCombate = $('#fazerCombate')
fazerCombate[0].addEventListener('change', function (event) {
    muda(fazerCombate[0].checked, 'icon_combat')
})

chrome.storage.local.get('fazerCombate', function (result) {
    fazerCombate[0].checked = result.fazerCombate
    muda(result.fazerCombate, 'icon_combat')
})

fazerCombate[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'fazerCombate': fazerCombate[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var tipoMasmorra = $('#tipoMasmorra')
chrome.storage.local.get('tipoMasmorra', function (result) {
    tipoMasmorra[0].checked = result.tipoMasmorra
})

tipoMasmorra[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'tipoMasmorra': tipoMasmorra[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var maisFraco = $('#maisFraco')
chrome.storage.local.get('maisFraco', function (result) {
    maisFraco[0].checked = result.maisFraco
})

maisFraco[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'maisFraco': maisFraco[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var comprarComida = $('#comprarComida')
chrome.storage.local.get('comprarComida', function (result) {
    comprarComida[0].checked = result.comprarComida
})

comprarComida[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'comprarComida': comprarComida[0].checked }, null);
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var setTab = $('#setTab')
setTab[0].addEventListener('click', function (event) {
    chrome.tabs.query({ active: true }, (tabs) => {
        console.log(tabs[0].id)
        chrome.storage.local.set({ 'getTabIdSwitch': tabs[0].id }, null);
    });
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//var tipoAtaqueExpedicao = $('#tipoAtaqueExpedicao')[0][0].selected

var tipoAtaqueExpedicao = $('#tipoAtaqueExpedicao')
chrome.storage.local.get('tipoAtaqueExpedicao', function (result) {
    tipoAtaqueExpedicao[0].value = result.tipoAtaqueExpedicao

    $('#tipoAtaqueExpedicao')[0][0].selected = result.tipoAtaqueExpedicao == 0

    $('#tipoAtaqueExpedicao')[0][1].selected = result.tipoAtaqueExpedicao == 1

    $('#tipoAtaqueExpedicao')[0][2].selected = result.tipoAtaqueExpedicao == 2

    $('#tipoAtaqueExpedicao')[0][3].selected = result.tipoAtaqueExpedicao == 3

    $('#tipoAtaqueExpedicao')[0][4].selected = result.tipoAtaqueExpedicao == 4


    tipoAtaqueExpedicao[0].value = result.tipoAtaqueExpedicao
})

tipoAtaqueExpedicao[0].addEventListener('change', function (event) {
    chrome.storage.local.set({ 'tipoAtaqueExpedicao': tipoAtaqueExpedicao[0].value }, null);
})

var tipoAtaqueExpedicao2 = $('#tipoAtaqueExpedicao')[0][2].selected
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function muda(result, itemId) {
    if (result == true) {
        document.getElementById(itemId).src = "img/" + itemId + "_active.jpg";
    } else {
        document.getElementById(itemId).src = "img/" + itemId + "_inactive.jpg";
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------