import { log, logError, setStorage } from "../../../services/background_utils";
import { Log, TipoLog } from "../../../services/model/log";

(async () => {
    try {
        let elemento = document.getElementById('inv') as HTMLElement;
        let qtdComida = elemento.children.length;
        await log(new Log(TipoLog.info, `Quantidade comida ${qtdComida}`))
        
        await setStorage('qtdComida', qtdComida);
    } catch (e) {
        await logError(e);
    }
})();