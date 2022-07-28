import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, getByXpath, log } from "../../utils";

doWork('abrirTabComidas', async () => {
    var divShop = getByXpath<HTMLElement>('//*[@id="shop_nav"]');
    var tabFoods = divShop.children[1] as HTMLButtonElement;
    tabFoods.click();

    await log(TipoLog.info, "Tab comidas aberta")
})