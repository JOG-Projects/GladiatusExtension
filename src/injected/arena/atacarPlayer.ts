import { clickAndWait, getByXpath, getFromStorage, log, logError, tryUntil } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

(async () => {
    try {
        await tryUntil(setPlayerName);
        await log(TipoLog.info, "Nome inserido")
        await clickAndWait('//*[@id="content"]/article/section/form/p[2]/input[2]', 1000);
    } catch (e) {
        await logError(e);
    }
})();

async function setPlayerName(): Promise<void> {
    let inputNome = getByXpath<HTMLInputElement>('//*[@id="ujn"]');
    let player = await getFromStorage<string>("currentAtkPlayer");
    inputNome.value = player;
    await log(TipoLog.info, `Inserindo nome para ser atacado: ${player}`);
}