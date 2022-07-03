import { createAlarm, getFromStorage, setStorage } from "./background_utils.js";
import { atkPlayers } from "./objectives/atkPlayers.js";

async function startAtkAlarm() {
    let runCooldown = (await getFromStorage("runCooldown")) ?? 25;
    let ultimaRunUnix = (await getFromStorage("ultimaRunCompleta")) ?? Date.now();
    let qtdAtk = (await getFromStorage("qtdAtks")) ?? 0;

    console.log(`qtdAtk: ${qtdAtk}`)
    console.log(`ultimaRun: ${new Date(ultimaRunUnix)}`)
    console.log(`runCooldown: ${runCooldown}`)

    let diaUltimaRun = new Date(ultimaRunUnix).getDate()

    let diaHoje = new Date().getDate()

    if (diaUltimaRun == diaHoje && qtdAtk == 5) {
        await setTomorrowAlarm(runCooldown);
        return;
    }

    console.log(`Setting up alarm to ${new Date(ultimaRunUnix)}`)
    await createAlarm("atkRun", ultimaRunUnix + 1000, runCooldown);
}

export async function handleAlarm(alarm) {
    console.log(`Disparado alarme: ${alarm.name}`)
    if (alarm.name === "atkRun") {
        await atkPlayers();

        let ultimaRunUnix = (await getFromStorage("ultimaRunCompleta")) ?? Date.now();
        let qtdAtk = (await getFromStorage("qtdAtks")) ?? 0;
        let runCooldown = (await getFromStorage("runCooldown")) ?? 25;

        console.log(`qtdAtk: ${qtdAtk}`)
        console.log(`ultimaRun: ${new Date(ultimaRunUnix)}`)
        console.log(`runCooldown: ${runCooldown}`)

        await setStorage("ultimaRunCompleta", Date.now())
        await setStorage("qtdAtks", ++qtdAtk)

        let diaUltimaRun = new Date(ultimaRunUnix).getDate()

        let diaHoje = new Date().getDate()

        if (diaUltimaRun == diaHoje && qtdAtk == 5) {
            await setTomorrowAlarm(runCooldown);
        }
    }
}

async function setTomorrowAlarm(runCooldown) {
    let amanha = tomorrowMidnight();
    console.log(`Finalizado runs de hoje, alarme programado para ${new Date(amanha)}`);
    await createAlarm("atkRun", amanha, runCooldown);
}

export async function initAlarms() {
    await startAtkAlarm()
}