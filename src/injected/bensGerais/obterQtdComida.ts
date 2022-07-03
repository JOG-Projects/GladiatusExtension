import { doWork, log, setStorage } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";


doWork("obterQtdComida", 0, async () => {
    let elemento = document.getElementById('inv') as HTMLElement;
    let qtdComida = elemento.children.length;
    await log(TipoLog.info, `Quantidade comida ${qtdComida}`)

    await setStorage('qtdComida', qtdComida);
});