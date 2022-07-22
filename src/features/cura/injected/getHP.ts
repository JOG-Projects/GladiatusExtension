import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, tryUntil, getByXpath, setStorage, log } from "../../utils";

doWork("getHP", async () => {
    await tryUntil(async () => await getHP());
});

async function getHP() {
    let elemento = getByXpath<HTMLElement>('//*[@id="header_values_hp_percent"]');
    let percentHP = elemento.innerHTML;

    await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
    await log(TipoLog.info, `Valor percentual de HP: ${percentHP}`);
}
