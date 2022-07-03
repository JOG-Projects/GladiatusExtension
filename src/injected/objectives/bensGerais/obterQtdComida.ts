import { log, logError, setStorage } from "../../../services/background_utils";
import { TipoLog } from "../../../services/model/tipoLog";

(async () => {
    try {
        let elemento = document.getElementById('inv') as HTMLElement;
        let qtdComida = elemento.children.length;
        await log(TipoLog.info, `Quantidade comida ${qtdComida}`)
        
        await setStorage('qtdComida', qtdComida);
    } catch (e) {
        await logError(e);
    }
})();