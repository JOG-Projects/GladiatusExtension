import { TipoLog } from "../../../model/infra/tipoLog";
import { getByXpath, setStorage, log, doWork2 } from "../../utils";

doWork2(async () => await getHP());

async function getHP() {
    let elemento = getByXpath<HTMLElement>('//*[@id="header_values_hp_percent"]');
    let percentHP = elemento.innerHTML;

    await setStorage("percentHP", Number(percentHP.slice(0, percentHP.length - 1)));
    await log(TipoLog.info, `Valor percentual de HP: ${percentHP}`);
}