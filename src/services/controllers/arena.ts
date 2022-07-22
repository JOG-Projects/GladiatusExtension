import { execute, setStorage, getFromStorage, timeout } from "../utils";
import { Cooldown } from "../model/cooldown";
import { comprarComida } from "./comprarComida";
import { getCurrentTarget, waitAtkCooldown } from "../service_utils";

export async function attackArena(): Promise<void> {
    let player = await getCurrentTarget("currentArenaTarget");

    await attackPlayer(player);
}

async function attackPlayer(player: string): Promise<void> {
    await waitAtkCooldown();

    console.log("Abrindo arena");
    await execute('abrirArena');
    await timeout(1000);
    await setStorage("currentAtkPlayer", player);
    console.log(`Atacando jogador: ${player}`);
    await execute('atacarPlayer');
    await timeout(1000)

    await checarHP();
}
