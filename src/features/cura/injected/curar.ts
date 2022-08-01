import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, getByXpath, log, setStorage, tryUntil } from "../../utils";

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

async function getInventoryFoods(): Promise<Element[]> {
    let inventario = getByXpath<HTMLElement>('//*[@id="content"]/table/tbody/tr/td[2]/div[6]/div');
    let comidas = Array.from(inventario.children).filter((i: any) => i.dataset.tooltip);
    return comidas;
}