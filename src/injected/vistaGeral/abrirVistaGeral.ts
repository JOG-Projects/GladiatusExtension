import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("abrirVistaGeral", async () => {
    await clickAndWait('//*[@id="mainmenu"]/a[1]', 1000);
    await log(TipoLog.info, "Abrindo Vista Geral");
});