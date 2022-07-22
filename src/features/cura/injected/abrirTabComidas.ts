import { resolvePromise, setStorage } from "../../services/utils";


(async () => {
    try {
        var penis = document.getElementById('shop_nav')!.children[1] as HTMLButtonElement;
        penis.click();
        await setStorage('abriuComidas', true);
    }
    finally {
        await resolvePromise('abrirTabComidas');
    };

})();
