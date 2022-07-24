import { execute, getFromStorage, setStorage, timeout } from "../../utils";

export async function checarHP(): Promise<void> {
    await execute('getHP');
    
    let percentHP = await getFromStorage<number>("percentHP");

    let percentHPMin = await getFromStorage<number>("minLife");

    console.log(`HP: atual: ${percentHP} min: ${percentHPMin}`)
    if (percentHP <= percentHPMin) {
        console.log('Comprando cura')
        await comprarComida();
    }
}

async function comprarComida(): Promise<void>{
    console.log("vou abrir os bens gerais")
    await execute('abrirBensGerais');
    console.log("vou abrir a tab comidas")
    await execute('abrirTabComidas');

    console.log("vou obter qtd comida")
    await execute('obterQtdComidaInv');
    let qtdComida = await getFromStorage<number>('qtdComidaInv');
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    if (qtdComida > qtdComidaMin){
        return;
    }

    console.log("vou comprar uma comidinha")
    await execute('comprarComida');
}