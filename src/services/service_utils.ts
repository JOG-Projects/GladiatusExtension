import { Cooldown } from "./model/cooldown";
import { TipoLog } from "./model/tipoLog";
import { execute, getByXpath, getFromStorage, log, setStorage, timeout } from "./utils";

export async function getCurrentTarget(mode: string): Promise<string> {
    let playersText = await getFromStorage<string>("atkListPlayers");

    if (!playersText || playersText.length == 0) {
        throw "Sem players configurados para atacar";
    }
    let current = await getFromStorage<number>(mode) ?? 0;
    let players = playersText.split("\n");
    return players[current];
}


export async function getAtkCooldown(xpath: string, key: string) {
    let elemento = getByXpath<HTMLElement>(xpath);
    let textCooldown = elemento.innerHTML;

    let timeSegments = textCooldown.split(":");

    let hours = Number(timeSegments[0] ?? 0);
    let minutes = Number(timeSegments[1] ?? 0);
    let seconds = Number(timeSegments[2] ?? 0);

    await setStorage(key, new Cooldown(hours, minutes, seconds));
    await log(TipoLog.info, `Valor do ${key} obtido: ${textCooldown}`);
}

export async function waitAtkCooldown(scriptFile: string, key: string): Promise<void> {
    await execute(scriptFile);
    let cooldown = await getFromStorage<Cooldown>(key);

    console.log(`Esperando cooldown ${key}: ${cooldown.minutos}:${cooldown.segundos}`);
    await timeout((cooldown.minutos * 60 + cooldown.segundos) * 1000);
}