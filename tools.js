//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function ready(value) {
    return new Promise(function (resolve, reject) {
        var result = value[0].innerHTML
        var result2 = result.indexOf('ready') != -1
        resolve(result2)
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function clickReady(value) {
    value[0].click()
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Verifica se esta na URL - Passar Parametro
function verificarPagina(value) {
    var verificar = window.location.href.indexOf(value) != -1
    return verificar
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function getRandom(min, max) {
    min = Math.ceil(min);
    return (Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min);
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function moveItem(dataToParam) {
    const requestUrl = "ajax.php?mod=inventory&submod=move&" + jQuery.param(dataToParam);
    sh = window.location.href.replace(/.+sh=/,"")
    const data = "&a=" + new Date().getTime() + "&sh=" + sh;
    jQuery.ajax({
        url: requestUrl,
        type: 'POST',
        data: data,
        async: false,
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------