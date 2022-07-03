import { clickAndWait, doWork, log } from "../../services/utils";

doWork("selecionarEquipamento", 1000, async () => {
    clickAndWait('//*[@id="char"]/div[10]/div');
});