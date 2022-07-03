import { getByXpath, log, logError, setStorage } from "../../../services/background_utils";

(async () => {
    try {     
        let elemento = getByXpath('//*[@id="header_values_hp_percent"]') as HTMLElement;   
        let percentHP = elemento.innerHTML;

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
        await log({type: "info", message: `Valor percentual do HP obtido: ${percentHP}`});

    } catch (e) {
        await logError(e);
    }
})();