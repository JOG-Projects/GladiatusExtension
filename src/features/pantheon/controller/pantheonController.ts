import { execute, getFromStorage, timeout } from "../../utils";

export async function pantheon() {
    let fazerPantheon = await getFromStorage<boolean>("pantheon");
    if (!fazerPantheon) {
        console.log("Pantheon Desabilitado");
        return;
    }

    await execute('abrirPantheon');
    await timeout(1000);
    await execute('verificarMissoes');
    await execute('selecionarMissoesPossiveis');
}