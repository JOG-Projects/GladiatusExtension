import { clickAndWait, doWork, log, tryUntil } from "../../services/utils";

doWork("selecionarInventario", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="inventory_nav"]/a[1]'));
});