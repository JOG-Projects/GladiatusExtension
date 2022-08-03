import { TipoLog } from "../../../model/infra/tipoLog";
import { getCurrentTarget } from "../../ataque_utils";
import { clickAndWait, doWork, getByXpath, getFromStorage, log } from "../../utils";

doWork(async () => {
    await setPlayerName()
    await log(TipoLog.info, "Nome inserido")
    clickAndWait('//*[@id="content"]/article/section[1]/form/p[2]/input[2]');
});

async function setPlayerName(): Promise<void> {
    let target = await getCurrentTarget("currentArenaTarget");
    let player = target.current;
    await log(TipoLog.info, `Inserindo nome para ser atacado: ${player}`);
    let inputNome = getByXpath<HTMLInputElement>('//*[@id="ujn"]');
    inputNome.value = player;
}