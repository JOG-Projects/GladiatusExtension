import { TipoLog } from "../../../model/infra/tipoLog";
import { execute,log, timeout } from "../../utils";

export async function pantheon() {
    await execute('abrirPantheon');
    await timeout(1000);
    await execute('verificarMissoes');        
    await execute('selecionarMissoesPossiveis');
}