import { execute, getFromStorage } from "../background_utils";

export async function comprarComida(): Promise<void>{
    await execute('src/injected/objectives/bensGerais/abrirBensGerais.js');
    await execute('src/injected/objectives/bensGerais/abrirTabComidas.js');
    await execute('src/injected/objectives/vistaGeral/obterQtdComida.js');
    let qtdComida = await getFromStorage<number>('qtdComida');
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    if (qtdComida > qtdComidaMin){
        return;
    }

    await execute('src/injected/objectives/bensGerais/comprarComida.js');
}