import { clickAndWait, log, logError } from "../../../services/background_utils";

(async () => {
    try {
        await clickAndWait('//*[@id="submenu1"]/a[6]', 1000);
        await log({type: "info", message: "Aberto aba bens gerais"});
    } catch (e) {
        await logError(e);
    }
})();