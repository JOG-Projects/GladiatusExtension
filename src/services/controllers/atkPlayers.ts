import { execute, setStorage, getFromStorage, timeout } from "../background_utils";
import { Cooldown } from "../model/cooldown";

export async function initAttackPlayers(): Promise<void> {
    let players = await getAllPlayers();

    console.log(`iniciando ataque aos players ${players}`)

    await attackPlayers(players);
}

async function getAllPlayers(): Promise<string[]> {
    let playersText = await getFromStorage<string>("atkListPlayers");

    if (!playersText || playersText.length == 0) {
        throw "Sem players configurados para atacar";
    }

    let players = playersText.split("\n");
    return players;
}

async function attackPlayers(players: string[]): Promise<void> {
    for (let player of players) {
        await attackPlayer(player);

        await checarHP();

        await waitAtkCooldown();
    }
}

async function attackPlayer(player: string): Promise<void> {
    console.log("Abrindo arena");
    await execute('src/injected/objectives/arena/abrirArena.js');

    await setStorage("currentAtkPlayer", player);
    console.log(`Atacando jogador: ${player}`);
    await execute('src/injected/objectives/arena/atacarPlayer.js');
}

async function waitAtkCooldown(): Promise<void> {
    await execute('src/injected/objectives/menusLaterais/getAtkCooldown.js');
    let cooldown = await getFromStorage<Cooldown>("atkCooldown");

    console.log(`Esperando cooldown: ${cooldown.minutos}:${cooldown.segundos}`);
    await timeout((cooldown.minutos * 60 + cooldown.segundos) * 1000);
}

async function checarHP(): Promise<void> {
    await execute('src/injected/objectives/menusLaterais/getHP.js');
    let percentHP = await getFromStorage<number>("percentHP");
}
