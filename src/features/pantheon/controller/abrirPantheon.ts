import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("abrirBensGerais", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="mainmenu"]/a[2]'));
});