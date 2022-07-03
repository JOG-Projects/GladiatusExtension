import { clickAndWait, log, logError } from "../../../services/background_utils";
import { TipoLog } from "../../../services/model/tipoLog";

(async () => {
    try {
        await clickAndWait('//*[@id="inventory_nav"]/a[1]', 1000);
        await log(TipoLog.info, "Selecionando inventário");

    } catch (e) {
        await logError(e);
    }
})();