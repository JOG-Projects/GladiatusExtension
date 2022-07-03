import { clickAndWait, doWork } from "../../services/utils";

doWork("abrirBensGerais", 1000, async () => {
    clickAndWait('//*[@id="submenu1"]/a[6]');
});