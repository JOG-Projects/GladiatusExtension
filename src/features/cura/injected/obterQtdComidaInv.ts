import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, tryUntil, log, setStorage } from "../../utils";

doWork("obterQtdComidaInv", async () => getQntComida());

async function getQntComida(): Promise<void> {
    let inventario = document.getElementById('inv') as HTMLElement;
    let comidas = inventario.children;
    
    await log(TipoLog.info, `Quantidade comida no inventario: ${comidas.length}`)

    await setStorage('qtdComidaInv', comidas.length);
}