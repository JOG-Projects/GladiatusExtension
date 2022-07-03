import { createAlarm, getFromStorage, setStorage, tomorrowMidnight } from "./utils";
import { initAttackPlayers } from "./controllers/atkPlayers";

async function startAtkAlarm(): Promise<void> {
    let runCooldown = (await getFromStorage<number>("runCooldown")) ?? 25;
    let ultimaRunUnix = (await getFromStorage<number>("ultimaRunCompleta")) ?? Date.now();
    let qtdAtk = (await getFromStorage<number>("qtdAtks")) ?? 0;

    console.log(`qtdAtk: ${qtdAtk}`);
    console.log(`ultimaRun: ${new Date(ultimaRunUnix)}`);
    console.log(`runCooldown: ${runCooldown}`);

    let diaUltimaRun = new Date(ultimaRunUnix).getDate();

    let diaHoje = new Date().getDate();

    if (diaUltimaRun == diaHoje && qtdAtk == 5) {
        setTomorrowAlarm(runCooldown);
        return;
    }

    console.log(`Setting up alarm to ${new Date(ultimaRunUnix)}`);
    createAlarm("atkRun", ultimaRunUnix + 1000, runCooldown);
}

export async function handleAlarm(alarm: chrome.alarms.Alarm): Promise<void> {
    console.log(`Disparado alarme: ${alarm.name}`);
    if (alarm.name === "atkRun") {
        await initAttackPlayers();

        let ultimaRunUnix = (await getFromStorage<number>("ultimaRunCompleta")) ?? Date.now();
        let qtdAtk = (await getFromStorage<number>("qtdAtks")) ?? 0;
        let runCooldown = (await getFromStorage<number>("runCooldown")) ?? 25;

        console.log(`qtdAtk: ${qtdAtk}`);
        console.log(`ultimaRun: ${new Date(ultimaRunUnix)}`);
        console.log(`runCooldown: ${runCooldown}`);

        await setStorage("ultimaRunCompleta", Date.now());
        await setStorage("qtdAtks", ++qtdAtk);

        let diaUltimaRun = new Date(ultimaRunUnix).getDate();

        let diaHoje = new Date().getDate();

        if (diaUltimaRun == diaHoje && qtdAtk == 5) {
            setTomorrowAlarm(runCooldown);
        }
    }
}

function setTomorrowAlarm(runCooldown: number): void {
    let amanha = tomorrowMidnight();
    console.log(`Finalizado runs de hoje, alarme programado para ${new Date(amanha)}`);
    createAlarm("atkRun", amanha, runCooldown);
}

export async function initAlarms(): Promise<void> {
    await startAtkAlarm();
}