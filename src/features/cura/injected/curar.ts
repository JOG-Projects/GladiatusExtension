import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, log, tryUntil } from "../../utils";

doWork("curar", async () => {
    let comidas = await tryUntil(() => getInventoryFoods())
    await log(TipoLog.info, "Peguei as comidinhas");

    consumeFood(comidas![0])

    await log(TipoLog.info, "Me curei");
});

async function getInventoryFoods(): Promise<HTMLCollection> {
    let inventario = document.getElementById('inv') as HTMLElement;
    let comidas = inventario.children;
    return comidas;
}

function consumeFood(comida: Element) {
    const dbClickEvent = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: false
    });

    comida.dispatchEvent(dbClickEvent);
}