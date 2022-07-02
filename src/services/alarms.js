import { createAlarm, getFromStorage, setStorage } from "./background_utils.js";
import { atkPlayers } from "./objectives/atkPlayers.js";

async function startAtkAlarm() {
    let runCooldown = (await getFromStorage("runCooldown")) ?? 25;
    let ultimaRunUnix = (await getFromStorage("ultimaRunCompleta")) ?? Date.now();
    let qtdAtk = (await getFromStorage("qtdAtks")) ?? 0;

    console.log(`qtdAtk: ${qtdAtk}`)
    console.log(`ultimaRun: ${ultimaRunUnix}`)
    console.log(`runCooldown: ${runCooldown}`)

    if (new Date(ultimaRunUnix).getDate() >= new Date().getDate() && qtdAtk == 5) {
        return;
    }

    console.log(`Setting up alarm to ${new Date(ultimaRunUnix)}`)
    await createAlarm("atkRun", ultimaRunUnix + 3000, runCooldown);
}

export async function handleAlarm(alarm) {
    if (alarm.name == "atkRun") {
        await atkPlayers();

        let ultimaRunUnix = (await getFromStorage("ultimaRunCompleta")) ?? Date.now();
        let qtdAtk = (await getFromStorage("qtdAtks")) ?? 0;
        let runCooldown = (await getFromStorage("runCooldown")) ?? 25;

        await setStorage("ultimaRunCompleta", Date.now())
        await setStorage("qtdAtks", ++qtdAtk)

        if (new Date(ultimaRunUnix).getDate() == new Date().getDate() && qtdAtk == 5) {
            let amanha = tomorrowMidnight();
            console.log(`Finalizado runs de hoje, alarme programado para ${new Date(amanha)}`)
            await createAlarm("atkRun", amanha, runCooldown);
        }
    }
}

export async function initAlarms() {
    await startAtkAlarm()
}