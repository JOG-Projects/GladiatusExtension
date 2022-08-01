import { getCurrentTarget, GetNext, waitAtkCooldown } from "../../ataque_utils";
import { checarHP } from "../../cura/controller/cura";
import { execute, setStorage, timeout } from "../../utils";

export async function attackCircus(): Promise<void> {
    let target = await getCurrentTarget("currentCircusTarget");

    await waitAtkCooldown("getCircusCooldown", "circusCooldown");

    console.log("Abrindo circus");
    await execute('abrirCircus');
    await timeout(1000);

    console.log(`Atacando (Circus) jogador: ${target.current}`);
    await execute('atacarCircus');
    await timeout(1000)

    await setStorage("currentCircusTarget", GetNext(target.players, target.current));

    await checarHP();
}