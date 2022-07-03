import { clickAndWait, log, logError } from "../../services/background_utils";
import { TipoLog } from "../../services/model/tipoLog";

(async () => {
    try {
        await clickAndWait('//*[@id="char"]/div[10]/div', 1000);
        await log(TipoLog.info, "Selecionando equipamento");

    } catch (e) {
        await logError(e);
    }
})();