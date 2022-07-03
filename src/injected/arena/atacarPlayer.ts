import { clickAndWait, doWork, getByXpath, getFromStorage, log, tryUntil } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";

doWork("atacarPlayer", 1000, async () => {
    await tryUntil(setPlayerName);
    await log(TipoLog.info, "Nome inserido")
    clickAndWait('//*[@id="content"]/article/section/form/p[2]/input[2]');
});

async function setPlayerName(): Promise<void> {
    let inputNome = getByXpath<HTMLInputElement>('//*[@id="ujn"]');
    let player = await getFromStorage<string>("currentAtkPlayer");
    inputNome.value = player;
    await log(TipoLog.info, `Inserindo nome para ser atacado: ${player}`);
}