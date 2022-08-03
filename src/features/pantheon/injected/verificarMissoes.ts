import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, getByXpath, log, setStorage, timeout, tryUntil } from "../../utils";

doWork(async () => obterNumeroMissoes());

async function obterNumeroMissoes(): Promise<void> {
    let elemento = getByXpath('//*[@id="quest_header_accepted"]');

    let missoes = elemento.textContent!.includes('5 / 5');
    
    await log(TipoLog.info, `Missoes cheias: ${missoes}`);

    await setStorage('missoesCheias', missoes);
}