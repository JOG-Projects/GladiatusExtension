import { getCurrentTarget, GetNext, waitAtkCooldown } from "../../ataque_utils";
import { checarHP } from "../../cura/controller/cura";
import { execute, getFromStorage, setStorage, timeout } from "../../utils";

export async function attackArena(): Promise<void> {
    let fazerArena = await getFromStorage<boolean>("arena");
    if(!fazerArena) {
        console.log("Arena desabilitada")
        return;
    }

    let target = await getCurrentTarget("currentArenaTarget");

    await waitAtkCooldown("getArenaCooldown", "arenaCooldown");

    console.log("Abrindo arena");
    await execute('abrirArena');
    await timeout(1000);

    await setStorage("currentArenaTarget", GetNext(target.players, target.current));
    console.log(`Atacando (Arena) jogador: ${target.current}`);
    await execute('atacarArena');
    await timeout(1000)

    await setStorage("currentArenaTarget", GetNext(target.players, target.current));

    await checarHP();
}