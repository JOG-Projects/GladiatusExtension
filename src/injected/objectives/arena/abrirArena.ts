import { clickAndWait, log, logError } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2500);
        await log(new Log(TipoLog.info, "Arena aberta"));

    } catch (e) {
        await logError(e);
    }
})();