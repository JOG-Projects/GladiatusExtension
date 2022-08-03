import { doWork, setStorage } from "../../utils";
import { getInventoryFoods } from "../cura_utils";

doWork(async () => getQntComida());

async function getQntComida(): Promise<void> {
    let comidas = await getInventoryFoods();
    await setStorage('qtdComidaInv', comidas.length);
}