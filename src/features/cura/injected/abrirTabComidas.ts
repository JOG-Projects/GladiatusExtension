import { doWork } from "../../utils";

doWork('abrirTabComidas', async () => {
    var loja = document.getElementById('shop_nav') as HTMLElement
    var tabComidas = loja.children[1] as HTMLButtonElement;
    tabComidas.click();
})