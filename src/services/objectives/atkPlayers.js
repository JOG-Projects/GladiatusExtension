import { execute, setStorage, getFromStorage, timeout } from "../background_utils.js";

export async function atkPlayers() {
    let playersText = await getFromStorage("atkListPlayers");

    if (!playersText || playersText.lenght == 0) {
        console.error("Sem players configurados para atacar")
        return
    }

    let players = playersText.split("\n")

    console.log(`iniciando ataque aos players ${playersText}`)

    for (let i in players) {
        await attackPlayer(players[i]);
    }
}

async function attackPlayer(player) {
    console.log("Abrindo arena");
    await execute('src/injected/objectives/arena/abrirArena.js');

    await setStorage("currentAtkPlayer", player);

    console.log(`Atacando jogador: ${player}`);
    await execute('src/injected/objectives/arena/atacarPlayer.js');
    
    await getTimeout();
    
    let timeout = getFromStorage("timeout");

    console.log(`Esperando cooldow: ${timeout}`);
    await timeout(timeout);


    
}