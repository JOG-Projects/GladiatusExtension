import { clickAndWait, doWork, tryUntil } from "../../utils";

doWork("abrirBensGerais", async () => clickAndWait('//*[@id="submenu1"]/a[4]'));