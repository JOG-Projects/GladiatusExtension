import { getCurrentTarget, waitAtkCooldown } from "../../ataque_utils";
import { Cooldown } from "../../../model/cooldown";
import { checarHP } from "../../cura/controller/comprarComida";
import { execute, setStorage, timeout } from "../../utils";

export async function attackArena(): Promise<void> {
    let player = await getCurrentTarget("currentArenaTarget");

    await attackPlayer(player);
}

async function attackPlayer(player: string): Promise<void> {
    await waitAtkCooldown("getArenaCooldown", "arenaCooldown");

    console.log("Abrindo arena");
    await execute('abrirArena');
    await timeout(1000);
    await setStorage("currentAtkPlayer", player);
    console.log(`Atacando jogador: ${player}`);
    await execute('atacarPlayer');
    await timeout(1000)

    await checarHP();
}
