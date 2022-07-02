import { setStorage } from "../../../services/background_utils.js";

(async () => {
    try {
        let qtdComida = document.getElementById('inv').children.length;
        await setStorage('qtdComida', qtdComida);
    } catch (e) {
        console.error(e)
    }
})();