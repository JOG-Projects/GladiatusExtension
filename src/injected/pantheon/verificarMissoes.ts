import { doWork, log, setStorage, tryUntil } from "../../services/utils";
import { TipoLog } from "../../services/model/tipoLog";


doWork("verificarMissoes", async () => {
    await tryUntil(async () => obterNumeroMissoes());
});

async function obterNumeroMissoes(): Promise<void> {
    let elemento = document.getElementById('quest_header_accepted') as HTMLElement;
    let missoes = elemento.textContent!.includes('5 / 5');
    await log(TipoLog.info, `Missoes cheias: ${missoes}`);

    await setStorage('missoesCheias', missoes);
}