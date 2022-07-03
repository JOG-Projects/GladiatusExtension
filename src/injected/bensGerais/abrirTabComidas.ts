import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("abrirTabComidas", async () => {
    await clickAndWait('//*[@id="shop_nav"]/a[1]/div', 1000);
    await log(TipoLog.info, "Aberta tab de comidas do vendedor");
});