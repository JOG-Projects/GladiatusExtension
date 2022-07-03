import { getByXpath, log, logError, setStorage } from "../../../services/background_utils";
import { TipoLog } from "../../../services/model/tipoLog";

(async () => {
    try {     
        let elemento = getByXpath<HTMLElement>('//*[@id="header_values_hp_percent"]');   
        let percentHP = elemento.innerHTML;

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
        await log(TipoLog.info, `Valor percentual de HP: ${percentHP}`);

    } catch (e) {
        await logError(e);
    }
})();