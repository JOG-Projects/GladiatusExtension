import { clickAndWait, log, logError } from "../../../services/background_utils";
import { TipoLog } from "../../../services/model/tipoLog";

(async () => {
    try {
        await clickAndWait('//*[@id="shop_nav"]/a[1]/div', 1000);
        await log(TipoLog.info, "Aberta tab de comidas do vendedor");
    } catch (e) {
        await logError(e);
    }
})();