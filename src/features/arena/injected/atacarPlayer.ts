import { TipoLog } from "../../../model/infra/tipoLog";
import { clickAndWait, doWork, getByXpath, getFromStorage, log, tryUntil } from "../../utils";

doWork("atacarPlayer", async () => {
    await tryUntil(setPlayerName);
    await log(TipoLog.info, "Nome inserido")
    await tryUntil(async () => clickAndWait('//*[@id="content"]/article/section/form/p[2]/input[2]'));
});

async function setPlayerName(): Promise<void> {
    let inputNome = getByXpath<HTMLInputElement>('//*[@id="ujn"]');
    let player = await getFromStorage<string>("currentAtkPlayer");
    inputNome.value = player;
    await log(TipoLog.info, `Inserindo nome para ser atacado: ${player}`);
}