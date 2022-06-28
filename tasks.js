
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
chrome.runtime.sendMessage({ action: "getTabId" }, function (res) {
    console.log("Resposta")
    console.log(res.tabId)// ok
});
chrome.runtime.sendMessage({ action: "setTabId" }, function (res) {
    console.log("Seted")
    console.log(res.getTabIdSwitch)// ok
});
*/
async function selectedTab() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            chrome.storage.local.get('getTabIdSwitch', function (result) {
                chrome.runtime.sendMessage({ action: "getTabId" }, function (res) {
                    var tabId = res.tabId;
                    if (tabId == result.getTabIdSwitch) {
                        resolve()
                    } else {
                        reject("Aba não selecionada!")
                    }
                })
            })
        }, 100)
    })
}

loadSettings()
async function loadSettings() {
    try {
        var menuMinLife = await loadMinLife()


        await selectedTab()
        await loadOnOff()
        var menuQtdMinimaFood = await loadMinFood()
        var menuMissaoArena = await loadFazerArena()
        var menuMissaoGrupoArena = await loadFazerGoupArena()
        var menuMissaoCombate = await loadFazerCombate()
        var delayMin = await loadMinDelay()
        var delayMax = await loadMaxDelay()
        var menuComer = await loadComer()
        var menuArena = await loadArena()
        var menuCircus = await loadCircus()
        var menuExpedicao = await loadExpedicao()
        var menuMasmorra = await loadMasmorra()
        var menuTipoMasmorra = await loadTipoMasmorra()
        var menuMaisFraco = await loadMaisFraco()
        var menuComprarComida = await loadComprarComida()
        var menuLoadTipoAtaqueExpedicao = await loadTipoAtaqueExpedicao()

        var menuAbaFood = 0

        await abaDoll()
        await abaBag(menuAbaFood)
        await abaBensGerais()

        var menuMissaoMaxQtdConsecultivos = await loadMaxConsecultivos()
        var readyArena = await ready(arena)
        await fazerArena(readyArena, menuArena, delayMin, delayMax, menuMaisFraco, lifeAtual, menuMinLife)
        var readyCircus = await ready(circus)
        await fazerCircus(readyCircus, menuCircus, delayMin, delayMax, menuMaisFraco, lifeAtual, menuMinLife)
        var readyMasmorra = await ready(masmorra)
        await fazerMasmorraNormalAvancado(menuTipoMasmorra)
        await fazerMasmorra(readyMasmorra, menuMasmorra, delayMin, delayMax, lifeAtual, menuMinLife)
        var readyExpedicao = await ready(expedicao)
        await fazerExpedicao(menuLoadTipoAtaqueExpedicao, readyExpedicao, menuExpedicao, delayMin, delayMax, lifeAtual, menuMinLife)
        var checkLifeInt = await checkLife(menuComer, menuMinLife)
        await startEatingIfFoodExists(checkLifeInt)
        var foodInventario = await qtdFoodInventario(menuQtdMinimaFood)
        var comprarComida = await buyfood(menuComprarComida)
        var qtdComidaMercador = await qtdFoodMercador(comprarComida)
        var comprarComida2 = await comprarFood(comprarComida)

        await pegarMissoes(menuMissaoArena, menuMissaoGrupoArena, menuMissaoCombate, menuMissaoMaxQtdConsecultivos)

        setTimeout(() => {
            console.log("LoadSetings")
            loadSettings()
        }, 2000)
    } catch (err) {
        console.log(err)
        //reload()
    }

}


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function abaDoll() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (verificarPagina('mod=overview') == true) {
                var aba = $(".charmercsel")
                if (aba.length > 0) {
                    if (aba[0].classList.length == 1) {
                        aba[0].click()
                        resolve()
                    } else {
                        resolve()
                    }
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        }, 100)
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function abaBag(idBag) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (verificarPagina('mod=overview') == true) {
                var aba = $("#inventory_nav")
                if (aba[0].children[idBag].classList.length == 1) {
                    aba[0].children[idBag].click()
                    resolve()
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        }, 100)
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function abaBensGerais() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (verificarPagina('mod=inventory') == true) {
                var aba = $(".shopTab")
                if (aba[1].classList.length == 1) {
                    aba[1].click()
                    resolve()
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        }, 100)
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function qtdFoodMercador(comprarComida) { // OK Tem que estar na tela do mercador com a aba 2 aberta
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (comprarComida == true) {
                var qtdFood = 0
                var shop = $('#shop')
                for (var i = 0; i < shop[0].children.length; i++) {
                    if ((shop[0].children[i].attributes[8].value.indexOf('icon_rubies') != -1) == false) {
                        qtdFood++
                    }
                }
                if (qtdFood >= 10) {
                    console.log("Quantidade de food no Bens Gerais = " + qtdFood)
                    resolve(qtdFood)
                } else {
                    var imgName = "res3.gif";
                    var imgRuby2 = $('form')[0].children[0].children[1].children[0].children.length
                    if (imgRuby2 == 0) {
                        $('input[name="bestechen"]')[0].click()
                        setTimeout(() => {
                            console.log("aqui1")
                            resolve()
                        }, 3000)
                    } else {
                        var imgRuby = $('form')[0].children[0].children[1].children[0].children[0].attributes[1].nodeValue
                        var check = imgRuby.indexOf(imgName) != -1
                        if (check == true) {
                            console.log("Não renova BENS GERAIS com Ruby!!!")
                            resolve()
                        } else {
                            $('input[name="bestechen"]')[0].click()
                            setTimeout(() => {
                                console.log("aqui2")
                                resolve()
                            }, 3000)
                        }
                    }
                }
            } else {
                resolve()
            }
        }, 500)
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function qtdFoodInventario(menuQtdMinimaFood) {// OK Tem que estar na página visão geral
    return new Promise(function (resolve, reject) {
        if (verificarPagina('mod=overview') == true) {
            setTimeout(() => {
                var allFoodItems = $('#inv')
                var FoodItemType = $('#inv')[0].children[0].dataset.contentType
                var qtdFood = 0

                for (var i = 0; i < allFoodItems[0].children.length; i++) {
                    if ($('#inv')[0].children[i].dataset.contentType == "64") {
                        qtdFood++
                    }
                }
                if (qtdFood < menuQtdMinimaFood) {
                    chrome.storage.local.set({ 'buyFood': true }, null);
                    resolve(qtdFood)
                } else {
                    chrome.storage.local.set({ 'buyFood': false }, null);
                    resolve(qtdFood)
                }
            }, 500)
        } else {
            resolve()
        }
    })

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function buyfood(comprarComida) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (comprarComida == true) {

                chrome.storage.local.get('buyFood', function (result) {
                    if (verificarPagina('mod=inventory') == true && result.buyFood == true) {
                        console.log("Comprando comida");
                        resolve(true)
                    } else if (result.buyFood == true) {
                        setTimeout(() => {
                            $('#submenu1')[0].children[5].click()
                        }, 500)
                    } else {
                        resolve()
                    }
                })
            } else {
                resolve()
            }
        }, 500)

    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function reload() {
    try {
        await loadOnOff()
    } catch (err) {
        setTimeout(() => {
            chrome.storage.local.get('onOff', function (result) {
                if (result.onOff == true) {
                    location.reload()
                } else {
                    reload()
                }
            })
        }, 10000)
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function fazerMasmorraNormalAvancado(tipo) {
    return new Promise(function (resolve, reject) {
        var teste = $('#content .contentItem h3');
        if (typeof teste[1] !== 'undefined') {
            if ($('.contentItem_content')[1].children.length == 1) {
                var botao = $('#content .contentItem form tbody tr td input');
                botao.innerHTML
                var disabled = botao[1].disabled
                if (tipo == true && disabled == false) {
                    botao[1].click()
                    setTimeout(() => {
                        resolve()
                    }, 200)
                } else {
                    botao[0].click()
                    setTimeout(() => {
                        resolve()
                    }, 200)
                }
            } else {
                resolve()
            }
        } else {
            resolve()
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function fazerCircus(readyTask, menuCircus, delayMin, delayMax, menuMaisFraco, lifeAtual, minLife) {
    return new Promise(function (resolve, reject) {
        if (readyTask == true && menuCircus == true && lifeAtual >= minLife) {
            var delay = getRandom(delayMin, delayMax)
            if (verificarPagina('Type=3') == true && readyTask == true) {

                setTimeout(() => {
                    //Esta na página
                    var enemies = $('#own3 table tbody tr');
                    var levels = enemies.find('td:eq(1)');
                    var attacks = enemies.find('td .attack');
                    var levelId = 0;
                    if (menuMaisFraco == true) {
                        for (var i = 0; i < levels.length; i++) { if (Number(levels[i].innerHTML) < Number(levels[levelId].innerHTML)) { levelId = i; } }
                    } else {
                        for (var i = 0; i < levels.length; i++) { if (Number(levels[i].innerHTML) > Number(levels[levelId].innerHTML)) { levelId = i; } }
                    }
                    console.log(`
██████████████████████
██╔══╗╔══╗╔══╗╔═╗╔╦╗██         C  I  R  C  U  S
██║╔╗║╚╗╔╝║╔╗║║╔╝║╔╝██    ID:    ${levelId}
██║╠╣║ ║║ ║╠╣║║╚╗║╚╗██    LEVEL: ${levels[levelId].innerHTML}
██╚╝╚╝ ╚╝ ╚╝╚╝╚═╝╚╩╝██    Delay: ${delay} Milisegundos
██████████████████████`);
                    if (attacks[levelId] == undefined) {
                        resolve()
                    } else {
                        attacks[levelId].click();
                    }
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                }, delay);
            } else {
                clickReady(circusBtn);
            }
        } else {
            resolve()
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function fazerArena(readyTask, menuArena, delayMin, delayMax, menuMaisFraco, lifeAtual, minLife) {
    return new Promise(function (resolve, reject) {
        if (readyTask == true && menuArena == true && lifeAtual >= minLife) {
            var delay = getRandom(delayMin, delayMax)
            if (verificarPagina('Type=2') == true && readyTask == true) {
                setTimeout(() => {
                    var enemies = $('#own2 table tbody tr');
                    var levels = enemies.find('td:eq(1)');
                    var attacks = enemies.find('td .attack');
                    var levelId = 0;
                    if (menuMaisFraco == true) {
                        for (var i = 0; i < levels.length; i++) { if (Number(levels[i].innerHTML) < Number(levels[levelId].innerHTML)) { levelId = i; } }
                    } else {
                        for (var i = 0; i < levels.length; i++) { if (Number(levels[i].innerHTML) > Number(levels[levelId].innerHTML)) { levelId = i; } }
                    }

                    console.log(`
██████████████████████
██╔══╗╔══╗╔══╗╔═╗╔╦╗██          A  R  E  N  A
██║╔╗║╚╗╔╝║╔╗║║╔╝║╔╝██    ID:    ${levelId}
██║╠╣║ ║║ ║╠╣║║╚╗║╚╗██    LEVEL: ${levels[levelId].innerHTML}
██╚╝╚╝ ╚╝ ╚╝╚╝╚═╝╚╩╝██    Delay: ${delay} Milisegundos
██████████████████████`);
                    if (attacks[levelId] == undefined) {
                        resolve()
                    } else {
                        attacks[levelId].click();
                    }
                    setTimeout(() => { resolve() }, 1000)
                }, delay);
            } else { clickReady(arenaBtn); }
        } else { resolve() }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function fazerMasmorra(readyTask, menuMasmorra, delayMin, delayMax, lifeAtual, minLife) {
    return new Promise(function (resolve, reject) {
        if (readyTask == true && menuMasmorra == true && lifeAtual >= minLife) {
            var delay = getRandom(delayMin, delayMax)
            if (verificarPagina('mod=dungeon') == true && menuMasmorra == true) {
                setTimeout(() => {
                    console.log(`
██████████████████████
██╔══╗╔══╗╔══╗╔═╗╔╦╗██         M A S M O R R A
██║╔╗║╚╗╔╝║╔╗║║╔╝║╔╝██
██║╠╣║ ║║ ║╠╣║║╚╗║╚╗██
██╚╝╚╝ ╚╝ ╚╝╚╝╚═╝╚╩╝██    Delay: ${delay} Milisegundos
██████████████████████`);
                    var enemies = $('#content div div img[src *= "9425/img/combatloc.gif"]');
                    var attackEnemy = enemies[0];
                    if (attackEnemy == undefined) {
                        resolve()
                    } else {
                        attackEnemy.click();
                    }
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                }, delay);
            } else {
                clickReady(dungeonBtn);
            }
        } else {
            resolve()
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function fazerExpedicao(tipo, readyTask, menuExpedicao, delayMin, delayMax, lifeAtual, minLife) {
    return new Promise(function (resolve, reject) {
        if (readyTask == true && menuExpedicao == true && lifeAtual >= minLife) {
            var delay = getRandom(delayMin, delayMax)
            if (tipo != 4) {
                if (verificarPagina('mod=location') == true && menuExpedicao == true) {
                    setTimeout(() => {
                        console.log(`
██████████████████████
██╔══╗╔══╗╔══╗╔═╗╔╦╗██         E X P E D I Ç Ã O
██║╔╗║╚╗╔╝║╔╗║║╔╝║╔╝██
██║╠╣║ ║║ ║╠╣║║╚╗║╚╗██
██╚╝╚╝ ╚╝ ╚╝╚╝╚═╝╚╩╝██    Delay: ${delay} Milisegundos
██████████████████████`);
                        $('#expedition_list .expedition_box div button')[tipo].click();
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                    }, delay);
                } else {
                    clickReady(expeditionBtn);
                }
            } else {
                if (verificarPagina('mod=location') == true && menuExpedicao == true) {
                    var box = $('#expedition_list')
                    var bestAtack = 3;
                    //Verifica qual é o ataque que ainda não tem todos os bonus ativados.
                    for (var i = 0; i < box[0].children.length; i++) {
                        if ((box[0].children[i].children[2].children[0].classList.value.indexOf('active') != -1) == false) { bestAtack = i; } else
                            if ((box[0].children[i].children[2].children[1].classList.value.indexOf('active') != -1) == false) { bestAtack = i; } else
                                if ((box[0].children[i].children[2].children[2].classList.value.indexOf('active') != -1) == false) { bestAtack = i; } else
                                    if ((box[0].children[i].children[2].children[3].classList.value.indexOf('active') != -1) == false) { bestAtack = i; }
                        if (bestAtack != 3) { i = 100 }
                    }
                    //Faz o ataque no primeiro que não tiver bonus, se tiver todos os bonus, vai acatar o BOSS direto.
                    setTimeout(() => {
                        console.log(`
██████████████████████
██╔══╗╔══╗╔══╗╔═╗╔╦╗██         E X P E D I Ç Ã O
██║╔╗║╚╗╔╝║╔╗║║╔╝║╔╝██
██║╠╣║ ║║ ║╠╣║║╚╗║╚╗██
██╚╝╚╝ ╚╝ ╚╝╚╝╚═╝╚╩╝██    Delay: ${delay} Milisegundos
██████████████████████`);
                        $('#expedition_list .expedition_box div button')[bestAtack].click()
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                    }, delay)
                } else {
                    clickReady(expeditionBtn);
                }
            }
        } else {
            resolve()
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function startEatingIfFoodExists(value) {
    return new Promise(function (resolve, reject) {
        if (value == true) {
            var checkExist = setInterval(function () {
                if (document.querySelectorAll("div[data-content-type='64']").length) {
                    moveItem(extractFoodData(foodLogic(getFoodList())));
                    clearInterval(checkExist);
                    console.log(`
┌───┬───┬────┬──┬─┐ ┌┬───┐
│┌──┤┌─┐│┌┐┌┐├┤├┤│└┐││┌─┐│
│└──┤│ │├┘││└┘│││┌┐└┘││ └┘
│┌──┤└─┘│ ││  ││││└┐│││┌─┐
│└──┤┌─┐│ ││ ┌┤├┤│ │││└┴─│
└───┴┘ └┘ └┘ └──┴┘ └─┴───┘
`)
                    setTimeout(() => {
                        missoes[1].click()
                        resolve()
                    }, 500)
                }
            }, 300);
        } else { resolve() }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function checkLife(menuComer, menuMinLife) {
    return new Promise(function (resolve, reject) {
        if (menuMinLife > lifeAtual && menuComer == true) {
            if (verificarPagina('mod=overview') == true) {
                resolve(true)
            } else {
                console.log(`
  ┌┐  ┌───┬┐┌┐┌┐
  ││  │┌─┐││││││
  ││  ││ │││││││
  ││ ┌┤│ │└┘└┘││
  │└─┘│└─┘├┐┌┐┌┘
  └───┴───┘└┘└┘
┌┐   ┌──┐┌───┐┌───┐
││   └┤├┘│┌──┘│┌──┘
││    ││ │└──┐│└──┐
││ ┌┐ ││ │┌──┘│┌──┘
│└─┘│┌┤├┐││   │└──┐
└───┘└──┘└┘   └───┘
`)
                missoes[0].click()
            }
        } else {
            resolve()
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function pegarMissoes(menuMissaoArena, menuMissaoGrupoArena, menuMissaoCombate, menuMissaoMaxQtdConsecultivos) {
    return new Promise(function (resolve, reject) {
        if (menuMissaoArena == false && menuMissaoGrupoArena == false && menuMissaoCombate == false) {
            resolve()
        } else {
            if (verificarPagina('mod=quests') == true) {
                var completeMissions = $('.contentboard_slot_active .quest_slot_button_finish');
                if (completeMissions.length > 0) {
                    console.log(`
  ┌───┬───┬┐┌┐┌┬───┬───┬───┐
  │┌─┐│┌──┤│││││┌─┐│┌─┐├┐┌┐│
  │└─┘│└──┤││││││ ││└─┘│││││
  │┌┐┌┤┌──┤└┘└┘│└─┘│┌┐┌┘││││
  │││└┤└──┼┐┌┐┌┤┌─┐│││└┬┘└┘│
  └┘└─┴───┘└┘└┘└┘ └┴┘└─┴───┘
┌─┐┌─┬──┬───┬───┬──┬───┬─┐ ┌┐
││└┘│├┤├┤┌─┐│┌─┐├┤├┤┌─┐││└┐││
│┌┐┌┐││││└──┤└──┐││││ ││┌┐└┘│
││││││││└──┐├──┐│││││ │││└┐││
│││││├┤├┤└─┘│└─┘├┤├┤└─┘││ │││
└┘└┘└┴──┴───┴───┴──┴───┴┘ └─┘
`);
                    completeMissions[0].click();
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                }
                var restartMissions = $('.contentboard_slot_active .quest_slot_button_restart');
                if (restartMissions.length > 0) {
                    console.log('restarting missions');
                    var clicked = restartMissions[0].click();
                }
                var cooldownMissoes = $('#quest_header_cooldown')
                var acceptMission = $('.quest_slot_button_accept')
                var restartMission = $('.quest_slot_button_restart')
                var finishMission = $('.quest_slot_button_finish')

                if (cooldownMissoes[0] == undefined && acceptMission[0] == undefined && restartMission[0] == undefined && finishMission[0] == undefined) {
                    resolve()
                    return
                }
                if (cooldownMissoes.length == 0) {
                    var numeroMissoesAceitas = $('#quest_header_accepted')
                    var verificar = numeroMissoesAceitas[0].innerHTML.indexOf("5 / 5") != -1
                    if (verificar == false) {
                        //+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++
                        function verificarSeMissaoTrue(missionType, menuMissaoArena, menuMissaoGrupoArena, menuMissaoCombate) {
                            if ((missionType.indexOf('icon_arena_inactive') != -1) == true && menuMissaoArena == true) {
                                return true;
                            }
                            if ((missionType.indexOf('icon_grouparena_inactive') != -1) == true && menuMissaoGrupoArena == true) {
                                return true;
                            }
                            if ((missionType.indexOf('icon_combat_inactive') != -1) == true && menuMissaoCombate == true) {
                                return true;
                            }
                            if ((missionType.indexOf('icon_dungeon_inactive') != -1) == true && menuMissaoDungeon == true) {
                                return true;
                            }
                            if ((missionType.indexOf('icon_expedition_inactive') != -1) == true && menuMissaoExpedition == true) {
                                return true;
                            }
                            if ((missionType.indexOf('icon_items_inactive') != -1) == true && menuMissaoItems == true) {
                                return true;
                            }
                            return false
                        }
                        //+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++
                        var getMissionGold = function (innerHTML) {
                            var endIndex = innerHTML.indexOf(` <img `);
                            var str = innerHTML.substring(0, endIndex);
                            var arr = str.split('');
                            var value = -1;

                            for (var i = arr.length; i > 0; i--) {
                                if (arr[i] == ' ') {
                                    value = Number(str.substring(i).replace(' ', ''));
                                    break;
                                }
                            }

                            return value;
                        }
                        //+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++
                        var missionsType = $('.contentboard_slot_inactive .quest_slot_icon');
                        var missionsGold = $('.contentboard_slot_inactive .quest_slot_reward_gold span');
                        var missionsAcceptBtn = $('.contentboard_slot_inactive .quest_slot_button_accept');
                        var missionText = $('.contentboard_slot_inactive .quest_slot_title');

                        var bestGold = 0
                        var bestMissionId = -1;
                        var minimumGoldMission = 5000;
                        for (var i = 0; i < missionsType.length; i++) {
                            var imgMission = missionsType[i].style.backgroundImage
                            if (verificarSeMissaoTrue(imgMission, menuMissaoArena, menuMissaoGrupoArena, menuMissaoCombate) == true) {
                                var checkTexto = missionText[i].innerHTML;
                                if ((checkTexto.indexOf('consecutivos') != -1) == true && checkTexto.replace(/\D/gim, '') <= menuMissaoMaxQtdConsecultivos) {
                                    if (getMissionGold(missionsGold[i].innerHTML) > bestGold) {
                                        bestMissionId = i
                                        bestGold = getMissionGold(missionsGold[i].innerHTML)
                                    }
                                } else if ((checkTexto.indexOf('consecutivos') != -1) == false) {
                                    if (getMissionGold(missionsGold[i].innerHTML) > bestGold) {
                                        bestMissionId = i
                                        bestGold = getMissionGold(missionsGold[i].innerHTML)
                                    }
                                }
                            }
                        }
                        //+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++
                        if (bestMissionId == -1) {
                            console.log(bestMissionId);
                            console.log('Missões novas');
                            $('#quest_footer_reroll input')[0].click();
                            return;
                        }
                        console.log(`
╔═╗╔═╗╔══╗╔═══╗╔═══╗╔═══╗╔═══╗
║║╚╝║║╚╣╠╝║╔═╗║║╔═╗║║╔═╗║║╔═╗║  Melhor missão encontrada
║╔╗╔╗║ ║║ ║╚══╗║╚══╗║║ ║║║║ ║║  ID: ${bestMissionId}
║║║║║║ ║║ ╚══╗║╚══╗║║╚═╝║║║ ║║  GOLD: ${getMissionGold(missionsGold[bestMissionId].innerHTML)}
║║║║║║╔╣╠╗║╚═╝║║╚═╝║║╔═╗║║╚═╝║  Aceitando....
╚╝╚╝╚╝╚══╝╚═══╝╚═══╝╚╝ ╚╝╚═══╝
`);
                        missionsAcceptBtn[bestMissionId].click();
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                        //+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++//+++++++++++++++++++++++++++++++++++++++++++++

                    }
                } else {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                }
            } else {
                setTimeout(() => {
                    missoes[1].click()
                }, 2000)
                setTimeout(() => {
                    resolve()
                }, 1000)
            }
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function receberBonus() {
    if ($('#linkLoginBonus')[0] == undefined) {
        $('#linkLoginBonus')[0].click()
        setTimeout(() => {
            console.log(`
    ┌──┐┌───┬─┐ ┌┬┐ ┌┬───┐
    │┌┐││┌─┐││└┐│││ ││┌─┐│
    │└┘└┤│ ││┌┐└┘││ ││└──┐
    │┌─┐││ │││└┐│││ │├──┐│
    │└─┘│└─┘││ │││└─┘│└─┘│
    └───┴───┴┘ └─┴───┴───┘
    `)
        }, 300)
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function receberBau() {
    if (($("#linknotification").length > 0)) {
        $("#linknotification")[0].click()
        setTimeout(() => {
            console.log(`
┌───┬┐ ┌┬───┬───┬────┐
│┌─┐││ ││┌──┤┌─┐│┌┐┌┐│
││ └┤└─┘│└──┤└──┼┘││└┘
││ ┌┤┌─┐│┌──┴──┐│ ││
│└─┘││ ││└──┤└─┘│ ││
└───┴┘ └┴───┴───┘ └┘
`)
        }, 300)
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
