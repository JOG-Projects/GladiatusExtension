import { clickAndWait, log, logError } from "../../../services/background_utils";
import { TipoLog } from "../../../services/model/tipoLog";

(async () => {
    try {
        await clickAndWait('//*[@id="mainmenu"]/a[1]', 1000);
        await log(TipoLog.info, "Abrindo Vista Geral");

    } catch (e) {
        await logError(e);
    }
})();