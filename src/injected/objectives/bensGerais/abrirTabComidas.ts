import { clickAndWait, log, logError } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        await clickAndWait('//*[@id="shop_nav"]/a[1]/div', 1000);
        await log(new Log(TipoLog.info, "Aberta tab de comidas do vendedor"));
    } catch (e) {
        await logError(e);
    }
})();