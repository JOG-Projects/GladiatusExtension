import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("selecionarInventario", async () => {
    await clickAndWait('//*[@id="inventory_nav"]/a[1]', 1000);
    await log(TipoLog.info, "Selecionando inventário");
});