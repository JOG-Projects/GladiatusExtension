import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, clickAndWait, log } from "../../utils";

doWork("abrirVistaGeral", async () => {
    await log(TipoLog.info, 'to tentando abrir a vista geral...');
    clickAndWait('//*[@id="mainmenu"]/div[1]/a[1]')
});