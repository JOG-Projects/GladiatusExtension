import { doWork, tryUntil, clickAndWait } from "../../utils";

doWork("abrirVistaGeral", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="mainmenu"]/a[1]'));
});