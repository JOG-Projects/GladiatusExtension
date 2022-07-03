import { clickAndWait, log, logError } from "../../services/background_utils";
import { TipoLog } from "../../services/model/tipoLog";


(async () => {
    try {
        await clickAndWait('//*[@id="submenu1"]/a[6]', 1000);
        await log(TipoLog.info, "Aberto aba bens gerais");
        
    } catch (e) {
        await logError(e);
    }
})();