import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, log, setStorage, tryUntil } from "../../utils";

doWork("curar", async () => {
    let comidas = await tryUntil(() => getInventoryFoods())
    await log(TipoLog.info, "Peguei as comidinhas");

    let qtdComidas = comidas?.length ?? 0;

    await setStorage("qtdComidasInv", qtdComidas);
    
    if (qtdComidas == 0) {
        return;
    }

    doubleClick(comidas![0])

    await log(TipoLog.info, "Me curei");
});

async function getInventoryFoods(): Promise<HTMLCollection> {
    let inventario = document.getElementById('inv') as HTMLElement;
    let comidas = inventario.children;
    return comidas;
}