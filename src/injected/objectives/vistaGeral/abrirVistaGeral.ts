import { clickAndWait, log, logError } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        await clickAndWait('//*[@id="mainmenu"]/a[1]', 1000);
        await log(new Log(TipoLog.info, "Abrindo Vista Geral"));

    } catch (e) {
        await logError(e);
    }
})();