import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("abrirBensGerais", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="submenu1"]/a[6]'));
});