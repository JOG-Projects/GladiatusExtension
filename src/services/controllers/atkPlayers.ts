import { execute, setStorage, getFromStorage, timeout } from "../utils";
import { Cooldown } from "../model/cooldown";
import { comprarComida } from "./comprarComida";

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

        console.log("vou checar o hp")
        await checarHP();

        await waitAtkCooldown();
    }
}

async function attackPlayer(player: string): Promise<void> {
    console.log("Abrindo arena");
    await execute('abrirArena');
    await timeout(1000);
    await setStorage("currentAtkPlayer", player);
    console.log(`Atacando jogador: ${player}`);
    await execute('atacarPlayer');
    await timeout(1000)
}

async function waitAtkCooldown(): Promise<void> {
    await execute('getAtkCooldown');
    let cooldown = await getFromStorage<Cooldown>("atkCooldown");

    console.log(`Esperando cooldown: ${cooldown.minutos}:${cooldown.segundos}`);
    await timeout((cooldown.minutos * 60 + cooldown.segundos) * 1000);
}

async function checarHP(): Promise<void> {
    await execute('getHP');
    let percentHP = await getFromStorage<number>("percentHP");
    let percentHPMin = await getFromStorage<number>("minLife");

    console.log(percentHP)
    console.log(percentHPMin)
    console.log("chequei o hp")
    if(percentHP <= percentHPMin ){
        console.log('vou comprar comida')
        await comprarComida();
    }
}
