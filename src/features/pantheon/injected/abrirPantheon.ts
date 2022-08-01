import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("abrirPantheon", async () => clickAndWait('//*[@id="mainmenu"]/div[2]/a[1]'));