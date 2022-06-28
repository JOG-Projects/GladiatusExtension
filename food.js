

// Fazer função para vereificar se ainda tem food na bag.
// Melhorar função de compra, por para ver o tempo
// Se acabar a food e não tiver para comprar, ficar tentando comprar e não fazer mais batalhas


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function foodLogic(foodData) {
    var missingHp = $("#header_values_hp_bar").attr("data-max-value") - $("#header_values_hp_bar").attr("data-value");
    var minPos = null;
    var minVal = 99999;
    foodData[0].forEach(function (item) {
        var diff = item - missingHp;
        if (diff < minVal && diff < 0) {
            minVal = diff;
            minPos = foodData[0].indexOf(item);
        } else {
            minVal = diff;
            minPos = foodData[0].indexOf(item);
        }
    });
    return foodData[1][minPos];

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getFoodList() {
    var allFoodItems = document.querySelectorAll("div[data-content-type='64']");
    var arrayFoodItems = $.map(allFoodItems, function (value, index) {
        return [value];
    });
    var healValues = [];
    arrayFoodItems.forEach(function (item) {
        var healVal = 1000;
        healValues.push(healVal);
    });
    var toReturn = [];
    toReturn.push(healValues, arrayFoodItems);
    return toReturn;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------





async function comprarFood(value) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (value == true) {
                var shop = $('#shop')
                var shopNav = $('#shop_nav')
                var qtd_food = 5;
                var bestFood1 = null;
                var bestFood2 = null;
                var bestFood3 = null;
                var bestFood4 = null;
                var bestFood5 = null;
                var bestFood6 = null;
                var bestFood7 = null;
                var bestFood8 = null;
                var bestFood9 = null;
                var bestFood10 = null;

                for (var i = 0; i < shop[0].children.length; i++) {
                    if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood1 == null) {
                        bestFood1 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood2 == null) {
                        bestFood2 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood3 == null) {
                        bestFood3 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood4 == null) {
                        bestFood4 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood5 == null) {
                        bestFood5 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood6 == null) {
                        bestFood6 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood7 == null) {
                        bestFood7 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood8 == null) {
                        bestFood8 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood9 == null) {
                        bestFood9 = shop[0].children[i]
                    } else if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false && bestFood10 == null) {
                        bestFood10 = shop[0].children[i]
                    }

                }

                setTimeout(() => {
                    var targLink = bestFood1
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood2
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood3
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood4
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood5
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood6
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood7
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood8
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood9
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    var targLink = bestFood10
                    var dblclickEvt = document.createEvent("MouseEvents");
                    dblclickEvt.initEvent("dblclick");
                    targLink.dispatchEvent(dblclickEvt);
                }, 2000)
                setTimeout(() => {
                    chrome.storage.local.set({ 'buyFood': false }, null);
                    resolve()
                }, 3000)


            } else {
                resolve()
            }

        }, 1000)
    })

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function extractFoodData(selectedFood) {

    var xCoord = $(selectedFood).attr("data-position-x");
    var yCoord = $(selectedFood).attr("data-position-y");
    var sendable = {
        from: 512,
        fromX: xCoord,
        fromY: yCoord,
        to: 8,
        toX: 1,
        toY: 1,
        amount: 1
    };

    return sendable;
}