import { getByXpath, log, logError, setStorage } from "../../../services/background_utils";
import { Cooldown } from "../../../services/model/cooldown";

(async () => {
    try {
        let elemento = getByXpath('//*[@id="cooldown_bar_text_arena"]') as HTMLElement;
        let textCooldown = elemento.innerHTML;

        let timeSegments = textCooldown.split(":");

        let hours = Number(timeSegments[0] ?? 0);
        let minutes = Number(timeSegments[1] ?? 0);
        let seconds = Number(timeSegments[2] ?? 0);

        await setStorage("atkCooldown", new Cooldown(hours, minutes, seconds));
        await log({type: "info", message: `Valor do cooldown obtido: ${textCooldown}`});

    } catch (e) {
        await logError(e);
    }
})();