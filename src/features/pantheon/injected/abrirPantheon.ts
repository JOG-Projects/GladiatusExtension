import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("abrirPantheon", async () => clickAndWait('//*[@id="mainmenu"]/a[2]'));