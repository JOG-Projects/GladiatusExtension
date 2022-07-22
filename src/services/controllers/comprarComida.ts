import { execute, getFromStorage, setStorage, timeout } from "../utils";

export async function comprarComida(): Promise<void>{
    console.log("vou abrir os bens gerais")
    await execute('abrirBensGerais');
    console.log("vou abrir a tab comidas")

    while(true){
        var abriu = await getFromStorage<boolean>('abriuComidas');
        console.log(abriu)
        if(abriu){
            await setStorage('abriuComidas', false);
            break;
        }
        console.log("tentando abrir comidas")
        await execute('abrirTabComidas');
        await timeout(200);
    }
    console.log("vou aobter qtd comida")
    await execute('obterQtdComidaInv');
    let qtdComida = await getFromStorage<number>('qtdComidaInv');
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    console.log("vou comprar uma comidinha")
    await execute('comprarComida');
    
    if (qtdComida > qtdComidaMin){
        return;
    }
}