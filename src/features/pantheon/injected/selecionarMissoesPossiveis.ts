import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, log, timeout, tryUntil } from "../../utils";

doWork("selecionarMissoesPossiveis", async () => {
    await tryUntil(async () => selecionarMissoesPossiveis());
});

async function selecionarMissoesPossiveis(): Promise<void> {
    let elemento = document.getElementsByClassName('contentboard_start') as HTMLCollection;
    let missoes = Array.from(elemento[0].children);
    let missaoDisponivel = getAvailableMission(missoes);
    if (missaoDisponivel == null) {
        await log(TipoLog.erro, 'Não achei nenhuma missão possível.');
        return;
    }
    await log(TipoLog.info, 'Achei uma missão.');
    await timeout(1000);
    missaoDisponivel.click();
}

function getAvailableMission(missoes: Element[]) {
    let divAvailableMission = missoes.find(availableMission)?.children!;
    return Array.from(divAvailableMission)
        .find(x => x.className
            .includes('quest_slot_button quest_slot_button_accept')) as HTMLButtonElement;
}

function availableMission(x: Element): boolean {
    return x.className.includes('contentboard_slot contentboard_slot_inactive');
}