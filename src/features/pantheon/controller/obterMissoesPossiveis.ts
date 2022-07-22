import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, tryUntil, log, setStorage } from "../../utils";

doWork("obterMissoesPossiveis", async () => {
    await tryUntil(async () => obterMissoesPossiveis());
});

async function obterMissoesPossiveis(): Promise<void> {
    let elemento = document.getElementsByClassName('contentboard_start') as HTMLCollection;
    let missoes = Array.from(elemento);
    let missoesPossiveis = missoes.filter(x => x.className.includes('contentboard_slot') 
    && x.innerHTML.includes('icon_arena_inactive') && x.innerHTML.includes('icon_grouparena_inactive')
    && x.innerHTML.includes('icon_combat_inactive'));
    await log(TipoLog.info, `Missões possíveis ${missoesPossiveis.length}`)

    await setStorage('missoes', missoesPossiveis);
}