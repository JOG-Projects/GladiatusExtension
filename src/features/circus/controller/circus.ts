import { getCurrentTarget, GetNext, waitAtkCooldown } from "../../ataque_utils";
import { checarHP } from "../../cura/controller/cura";
import { execute, getFromStorage, setStorage, timeout } from "../../utils";

export async function attackCircus(): Promise<void> {
    let fazerCircus = await getFromStorage<boolean>("circus");
    if (!fazerCircus) {
        console.log("Circus desabilitado");
        return;
    }

    let target = await getCurrentTarget("currentCircusTarget");

    await waitAtkCooldown("getCircusCooldown", "circusCooldown");

    console.log("Abrindo circus");
    await execute('abrirCircus');
    await timeout(3000);

    console.log(`Atacando (Circus) jogador: ${target.current}`);
    await execute('atacarCircus');

    await setStorage("currentCircusTarget", GetNext(target.players, target.current));

    await timeout(1000)
    await checarHP();
}