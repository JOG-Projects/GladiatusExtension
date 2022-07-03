import { clickAndWait, doWork, log } from "../../services/utils";

doWork("selecionarInventario", 1000, async () => {
    clickAndWait('//*[@id="inventory_nav"]/a[1]');
});