import { clickAndWait, log, logError } from "../../../services/background_utils";

(async () => {
    try {
        await clickAndWait('//*[@id="inventory_nav"]/a[1]', 1000);
        await log({type: "info", message: 'Selecionando inventário'});

    } catch (e) {
        await logError(e);
    }
})();