import { execute, getByXpath, getFromStorage, log, setStorage, timeout } from "./utils";
import { Cooldown } from "../model/cooldown";
import { TipoLog } from "../model/infra/tipoLog";

export async function getCurrentTarget(mode: string): Promise<{ current: string, players: string[] }> {
    let playersText = await getFromStorage<string>("atkListPlayers");

    if (!playersText || playersText.length == 0) {
        throw "Sem players configurados para atacar";
    }
    let players = playersText.split("\n");
    let current = await getFromStorage<string>(mode) ?? players[0];
    return { current: current, players: players };
}


export async function getAtkCooldown(xpath: string, key: string) {
    let elemento = getByXpath<HTMLElement>(xpath);
    let textCooldown = elemento.textContent;

    let timeSegments = textCooldown!.split(":");

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

export function GetNext(players: string[], current: string): string {
    return players[1 + players.indexOf(current)] ?? players[0]
}