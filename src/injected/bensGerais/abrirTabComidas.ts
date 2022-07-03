import { clickAndWait, doWork, tryUntil } from "../../services/utils";

doWork("abrirTabComidas", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="shop_nav"]/a[1]/div'));
});