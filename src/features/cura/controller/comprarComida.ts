import { execute, getFromStorage, setStorage, timeout } from "../../utils";

export async function checarHP(): Promise<void> {
    await execute('getHP');

    let percentHP = await getFromStorage<number>("percentHP");

    let percentHPMin = await getFromStorage<number>("minLife");

    console.log(`HP atual: ${percentHP}`)
    console.log(`HP min: ${percentHPMin}`)

    if (percentHP > percentHPMin) {
        console.log('Não preciso me curar')
        return;
    }

    console.log('Preciso me curar')
    await curar();
}

async function curar(): Promise<void> {
    console.log("vou abrir os bens gerais")
    await execute('abrirBensGerais');

    await timeout(1000);

    console.log("vou abrir a tab comidas")
    await execute('abrirTabComidas');

    let qtdComida = await obterQtdComida();
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    console.log(`Comida atual: ${qtdComida}`)
    console.log(`Comida min: ${qtdComidaMin}`)

    await usarCura();

    if (qtdComida > qtdComidaMin) {
        console.log("não preciso comprar comida")
        return;
    }

    console.log("vou comprar comida")
    await execute('comprarComida');
}

async function obterQtdComida() {
    console.log("vou obter qtd comida");
    await execute('obterQtdComidaInv');
    return await getFromStorage<number>('qtdComidaInv');
}

async function usarCura(): Promise<void> {
    console.error('IMPLEMENTAR: ARRASTANDO COMIDA PRO BONECO')
}
