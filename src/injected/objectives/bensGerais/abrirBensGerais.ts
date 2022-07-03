import { clickAndWait, log, logError } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        await clickAndWait('//*[@id="submenu1"]/a[6]', 1000);
        await log(new Log(TipoLog.info, "Aberto aba bens gerais"));
        
    } catch (e) {
        await logError(e);
    }
})();