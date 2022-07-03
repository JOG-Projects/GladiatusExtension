import { getByXpath, setStorage, log, doWork } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("getHP",0, async () => {
    let elemento = getByXpath<HTMLElement>('//*[@id="header_values_hp_percent"]');
    let percentHP = elemento.innerHTML;

    await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
    await log(TipoLog.info, `Valor percentual de HP: ${percentHP}`);
});