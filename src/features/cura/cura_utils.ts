import { TipoLog } from "../../model/infra/tipoLog";
import { getByXpath, log } from "../utils";

export async function getInventoryFoods(): Promise<Element[]> {
    await log(TipoLog.info, 'Vou achar o inventario...')
    let inventario = getByXpath<HTMLElement>('//*[@id="inv"]')
    await log(TipoLog.info, 'Achei o inventario...')
    let comidas = Array.from(inventario.children).filter((i: any) => i.dataset.tooltip);
    return comidas;
}