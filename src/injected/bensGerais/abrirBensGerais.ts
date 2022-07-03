import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("abrirBensGerais", async () => {
    await clickAndWait('//*[@id="submenu1"]/a[6]', 1000);
    await log(TipoLog.info, "Aberto aba bens gerais");
});