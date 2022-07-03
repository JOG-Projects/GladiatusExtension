import { clickAndWait, log, logError } from "../../services/background_utils";
import { TipoLog } from "../../services/model/tipoLog";

(async () => {
    try {
        await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2500);
        await log(TipoLog.info, "Arena aberta");

    } catch (e) {
        await logError(e);
    }
})();