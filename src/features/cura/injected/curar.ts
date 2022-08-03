import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, getByXpath, log, setStorage } from "../../utils";

doWork(async () => {
    let comidas = await getInventoryFoods();
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
    await log(TipoLog.info, 'Vou achar o inventorio...')
    let inventario = getByXpath<HTMLElement>('//*[@id="inv"]')
    await log(TipoLog.info, 'Achei o inventorio...')
    // let comidas = Array.from(inventario.children).filter((i: any) => i.dataset.tooltip);
    return inventario.children;
}