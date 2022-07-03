import { execute, getFromStorage } from "../background_utils";

export async function comprarComida(){
    await execute('src/injected/objectives/bensGerais/abrirBensGerais.js');
    await execute('src/injected/objectives/bensGerais/abrirTabComidas.js');
    await execute('src/injected/objectives/vistaGeral/obterQtdComida.js');
    let qtdComida = await getFromStorage('qtdComida') as number;
    let qtdComidaMin = await getFromStorage('qtdComidaMin') as number;

    if (qtdComida > qtdComidaMin){
        return;
    }

    await execute('src/injected/objectives/bensGerais/comprarComida.js');
}