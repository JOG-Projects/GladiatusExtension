async function loadOnOff() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('onOff', function (result) {
            if (result.onOff == true) {
                resolve(result.onOff);
            } else {
                reject("Bot esta desativado")
            }
        })
    });
}
async function loadArena() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('arena', function (result) {
            if (result.arena == true) {
                resolve(result.arena);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadCircus() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('circus', function (result) {
            if (result.circus == true) {
                resolve(result.circus);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadExpedicao() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('espedicao', function (result) {
            if (result.espedicao == true) {
                resolve(result.espedicao);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadMasmorra() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('masmorra', function (result) {
            if (result.masmorra == true) {
                resolve(result.masmorra);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadComer() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('comer', function (result) {
            if (result.comer == true) {
                resolve(result.comer);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadMinLife() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('minLife', function (result) {
            if (result.minLife != undefined) {
                resolve(result.minLife);
            } else {
                resolve(20);
                chrome.storage.local.set({ 'minLife': 20 }, null);
            }
        })
    });
}
async function loadMinDelay() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('minDelay', function (result) {
            if (result.minDelay != undefined) {
                resolve(result.minDelay);
            } else {
                resolve(2000);
                chrome.storage.local.set({ 'minDelay': 2000 }, null);
            }
        })
    });
}
async function loadMinFood() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('minFood', function (result) {
            if (result.minFood != undefined) {
                resolve(result.minFood);
            } else {
                resolve(2000);
                chrome.storage.local.set({ 'minFood': 10 }, null);
            }
        })
    });
}
async function loadMaxDelay() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('maxDelay', function (result) {
            if (result.maxDelay != undefined) {
                resolve(result.maxDelay);
            } else {
                resolve(6000);
                chrome.storage.local.set({ 'maxDelay': 6000 }, null);
            }
        })
    });
}
async function loadMaxConsecultivos() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('maxConsecultivos', function (result) {
            if (result.maxConsecultivos != undefined) {
                resolve(result.maxConsecultivos);
            } else {
                resolve(6000);
                chrome.storage.local.set({ 'maxConsecultivos': 5 }, null);
            }
        })
    });
}
async function loadFazerArena() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('fazerArena', function (result) {
            if (result.fazerArena != undefined) {
                resolve(result.fazerArena);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadFazerGoupArena() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('fazerGoupArena', function (result) {
            if (result.fazerGoupArena != undefined) {
                resolve(result.fazerGoupArena);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadFazerCombate() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('fazerCombate', function (result) {
            if (result.fazerCombate != undefined) {
                resolve(result.fazerCombate);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadTipoMasmorra() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('tipoMasmorra', function (result) {
            if (result.tipoMasmorra != undefined) {
                resolve(result.tipoMasmorra);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadMaisFraco() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('maisFraco', function (result) {
            if (result.maisFraco != undefined) {
                resolve(result.maisFraco);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadComprarComida() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('comprarComida', function (result) {
            if (result.comprarComida != undefined) {
                resolve(result.comprarComida);
            } else {
                resolve(false);
            }
        })
    });
}
async function loadTipoAtaqueExpedicao() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get('tipoAtaqueExpedicao', function (result) {
            if (result.tipoAtaqueExpedicao != undefined) {
                resolve(result.tipoAtaqueExpedicao);
            } else {
                resolve(false);
            }
        })
    });
}

//PVE
var expedicao = $('#cooldown_bar_expedition')
var masmorra = $('#cooldown_bar_dungeon')
//PVP
var arena = $('#cooldown_bar_arena')
var circus = $('#cooldown_bar_ct')
//Menu
// var menuNivelMasmorra = 1 // 0 - Normal / 1 - Avançada
// var menuTipoExpedicao = 4 // 0 1 2 3 boss 4 Pegar as habilidades que faltam
var menuPegarMissoes = true
//Food
// var menuComprarFood = true
//Missions
var menuMissaoDungeon = false // Icones da página Phantheon
var menuMissaoExpedition = false // Icones da página Phantheon
var menuMissaoItems = false // Icones da página Phantheon
//Butons
var arenaBtn = $('#cooldown_bar_arena a')
var circusBtn = $('#cooldown_bar_ct a')
var dungeonBtn = $('#cooldown_bar_dungeon a')
var expeditionBtn = $('#cooldown_bar_expedition a')
var missoes = $('#mainmenu a')
var bonusBtn = $('#linkLoginBonus')
var bonusBau = $('#linknotification')


var lifeAtual = $('#header_values_hp_bar_fill')[0].clientWidth