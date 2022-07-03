import { getByXpath, log, logError, setStorage } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {     
        let elemento = getByXpath('//*[@id="header_values_hp_percent"]') as HTMLElement;   
        let percentHP = elemento.innerHTML;

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
        await log(new Log(TipoLog.info, `Valor percentual de HP: ${percentHP}`));

    } catch (e) {
        await logError(e);
    }
})();