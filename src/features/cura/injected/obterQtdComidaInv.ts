import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, tryUntil, log, setStorage } from "../../utils";

doWork("obterQtdComidaInv", async () => getQntComida());

async function getQntComida(): Promise<void> {
    let elemento = document.getElementById('inv') as HTMLElement;
    let qtdComida = elemento.children.length;
    await log(TipoLog.info, `Quantidade comida no inventario: ${qtdComida}`)

    await setStorage('qtdComidaInv', qtdComida);
}