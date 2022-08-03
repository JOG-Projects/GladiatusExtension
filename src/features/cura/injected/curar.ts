import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, getByXpath, log, setStorage } from "../../utils";
import { getInventoryFoods } from "../cura_utils";

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