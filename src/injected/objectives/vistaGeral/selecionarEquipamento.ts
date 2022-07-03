import { clickAndWait, log, logError } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        await clickAndWait('//*[@id="char"]/div[10]/div', 1000);
        await log(new Log(TipoLog.info, "Selecionando equipamento"));

    } catch (e) {
        await logError(e);
    }
})();