import { clickAndWait, doWork, tryUntil } from "../../services/utils";

doWork("abrirBensGerais", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="submenu1"]/a[6]'));
});