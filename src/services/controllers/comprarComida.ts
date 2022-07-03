import { execute, getFromStorage } from "../utils";

export async function comprarComida(): Promise<void>{
    await execute('abrirBensGerais');
    await execute('abrirTabComidas');
    await execute('obterQtdComida');
    let qtdComida = await getFromStorage<number>('qtdComida');
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    if (qtdComida > qtdComidaMin){
        return;
    }

    await execute('comprarComida');
}