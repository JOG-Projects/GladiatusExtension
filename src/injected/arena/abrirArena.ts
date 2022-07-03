import { clickAndWait, doWork, log } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("abrirArena", async () => {
    await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2500);
    await log(TipoLog.info, "Arena aberta");
});