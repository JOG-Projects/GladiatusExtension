// Fazer função para verificar se ainda tem food na bag.
// Melhorar função de compra, por para ver o tempo
// Se acabar a food e não tiver para comprar, ficar tentando comprar e não fazer mais batalhas

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function foodLogic(foodData) {
    var missingHp = $("#header_values_hp_bar").attr("data-max-value") - $("#header_values_hp_bar").attr("data-value");
    var minPos = null;
    var minVal = Number.MIN_VALUE;
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
                var shop = $('#shop')[0]
                var shopNav = $('#shop_nav')
                var qtd_food = 5;

                var bestFoods = [];

                for (var i = 0; i < shop.children.length; i++) {
                    let naoAchouRubies = shop.children[i].attributes[8].value.indexOf('icon_rubies') == -1;

                    for (var j = 0; j < 9; j++) {
                        if (naoAchouRubies && bestFoods[j] == null) {
                            bestFoods[j] = shop.children[i]
                        }
                    }
                }

                for (let food in bestFoods) {
                    setTimeout(() => {
                        var targLink = food
                        var dblclickEvt = document.createEvent("MouseEvents");
                        dblclickEvt.initEvent("dblclick");
                        targLink.dispatchEvent(dblclickEvt);
                    }, 2000)
                }

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