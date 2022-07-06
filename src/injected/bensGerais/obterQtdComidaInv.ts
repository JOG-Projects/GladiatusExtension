import { doWork, log, setStorage, tryUntil } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";


doWork("obterQtdComidaInv", async () => {
    await tryUntil(async () => getQntComida());
});

async function getQntComida(): Promise<void> {
    let elemento = document.getElementById('inv') as HTMLElement;
    let qtdComida = elemento.children.length;
    await log(TipoLog.info, `Quantidade comida no inventario: ${qtdComida}`)

    await setStorage('qtdComidaInv', qtdComida);
}