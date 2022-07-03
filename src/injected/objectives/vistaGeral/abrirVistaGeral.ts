import { clickAndWait, log, logError } from "../../../services/background_utils";

(async () => {
    try {
        await clickAndWait('//*[@id="mainmenu"]/a[1]', 1000);
        await log({type: "info", message: 'Abrindo vista geral'});

    } catch (e) {
        await logError(e);
    }
})();