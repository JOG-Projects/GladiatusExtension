import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("selecionarEquipamento", async () => {
    await clickAndWait('//*[@id="char"]/div[10]/div', 1000);
    await log(TipoLog.info, "Selecionando equipamento");
});