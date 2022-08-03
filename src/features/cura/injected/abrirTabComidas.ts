import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, getByXpath, log } from "../../utils";

doWork('abrirTabComidas', async () => {
    let divShop = getByXpath<HTMLElement>('//*[@id="shop_nav"]');
    let tabFoods = divShop.children[1] as HTMLButtonElement;
    tabFoods.click();

    await log(TipoLog.info, "Tab comidas aberta")
})