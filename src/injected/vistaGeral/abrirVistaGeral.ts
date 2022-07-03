import { clickAndWait, doWork, log } from "../../services/utils";

doWork("abrirVistaGeral", 1000, async () => {
    clickAndWait('//*[@id="mainmenu"]/a[1]');
});