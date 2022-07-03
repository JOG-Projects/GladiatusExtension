import { clickAndWait, doWork, log, tryUntil } from "../../services/utils";

doWork("abrirVistaGeral", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="mainmenu"]/a[1]'));
});