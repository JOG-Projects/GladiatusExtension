import { getByXpath, setStorage, log, doWork } from "../../services/utils";
import { Cooldown } from "../../services/model/cooldown";
import { TipoLog } from "../../services/model/tipoLog";

doWork("getAtkCooldown", async () => {
    let elemento = getByXpath<HTMLElement>('//*[@id="cooldown_bar_text_arena"]');
    let textCooldown = elemento.innerHTML;

    let timeSegments = textCooldown.split(":");

    let hours = Number(timeSegments[0] ?? 0);
    let minutes = Number(timeSegments[1] ?? 0);
    let seconds = Number(timeSegments[2] ?? 0);

    await setStorage("atkCooldown", new Cooldown(hours, minutes, seconds));
    await log(TipoLog.info, `Valor do cooldown obtido: ${textCooldown}`);
});