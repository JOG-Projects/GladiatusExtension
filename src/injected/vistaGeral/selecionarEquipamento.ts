import { clickAndWait, doWork, log, tryUntil } from "../../services/utils";

doWork("selecionarEquipamento", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="char"]/div[10]/div'));
});