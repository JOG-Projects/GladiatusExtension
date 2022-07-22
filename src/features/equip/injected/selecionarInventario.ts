import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("selecionarInventario", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="inventory_nav"]/a[1]'));
});