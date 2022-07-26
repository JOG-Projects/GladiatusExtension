import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, getByXpath, log } from "../../utils";

doWork('abrirTabComidas', async () => {
    var tabComidas = getByXpath<HTMLElement>('//*[@id="shop_nav"]/a[1]');
    tabComidas.click();

    await log(TipoLog.info, "Tab comidas aberta")
})