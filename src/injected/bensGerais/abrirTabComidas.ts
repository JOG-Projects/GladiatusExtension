import { clickAndWait, doWork } from "../../services/utils";

doWork("abrirTabComidas", 1000, async () => {
    clickAndWait('//*[@id="shop_nav"]/a[1]/div');
});