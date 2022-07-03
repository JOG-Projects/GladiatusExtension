import { log, logError, setStorage } from "../../../services/background_utils";

(async () => {
    try {
        let elemento = document.getElementById('inv') as HTMLElement;
        let qtdComida = elemento.children.length;
        await log({type: "info", message: `Quantidade comida ${qtdComida}`})
        
        await setStorage('qtdComida', qtdComida);
    } catch (e) {
        await logError(e);
    }
})();