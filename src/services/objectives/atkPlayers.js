import { execute, setStorage, getFromStorage, timeout } from "../background_utils.js";

export async function atkPlayers() {
    let playersText = await getFromStorage("atkListPlayers");

    if (!playersText || playersText.lenght == 0) {
        console.error("Sem players configurados para atacar")
        return
    }

    let players = playersText.split("\n")

    console.log(`iniciando ataque aos players ${playersText}`)

    for (let player of players) {
        await attackPlayer(player);

        await checarHP();

        await waitAtkCooldown();
    }
}

async function attackPlayer(player) {
    console.log("Abrindo arena");
    await execute('src/injected/objectives/arena/abrirArena.js');

    await setStorage("currentAtkPlayer", player);
    console.log(`Atacando jogador: ${player}`);
    await execute('src/injected/objectives/arena/atacarPlayer.js');
}

async function waitAtkCooldown() {
    await execute('src/injected/objectives/menusLaterais/getAtkCooldown.js');
    let cooldown = await getFromStorage("atkCooldown");

    console.log(`Esperando cooldown: ${cooldown.minutes}:${cooldown.seconds}`);
    await timeout((cooldown.minutes * 60 + cooldown.seconds) * 1000);
}

async function checarHP() {
    await execute('src/injected/objectives/menusLaterais/getHP.js');
    let percentHP = await getFromStorage("percentHP");

    console.log(`Percentual de HP: ${percentHP}%`);
}
