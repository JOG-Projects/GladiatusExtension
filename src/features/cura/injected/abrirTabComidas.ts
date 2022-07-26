import { doWork, getByXpath } from "../../utils";

doWork('abrirTabComidas', async () => {
    var tabComidas = getByXpath<HTMLElement>('//*[@id="shop_nav"]/a[1]/div');
    tabComidas.click();
})