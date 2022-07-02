import { execute, getFromStorage } from "../background_utils.js";

export async function comprarComida(){
    await execute('src/injected/objectives/bensGerais/abrirBensGerais.js');
    await execute('src/injected/objectives/vistaGeral/obterQtdComida.js');
    let qtdComida = await getFromStorage('qtdComida');
    let qtdComidaMin = await getFromStorage('qtdComidaMin');

    if (qtdComida > qtdComidaMin){
        return;
    }

    await execute()
}