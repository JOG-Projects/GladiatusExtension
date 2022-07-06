import { clickAndWait, doWork, tryUntil } from "../../services/utils";

doWork("abrirBensGerais", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="mainmenu"]/a[2]'));
});