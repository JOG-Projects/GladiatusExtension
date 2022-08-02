import { execute, getFromStorage, setStorage, timeout } from "../../utils";

export async function checarHP(): Promise<void> {
    let curarAtivado = getFromStorage<boolean>("curar");
    if (!curarAtivado) {
        console.log("Cura desabilitada!!!");
        return;
    }

    let percentHP = await getHP();

    let percentHPMin = await getMinHP();

    console.log(`HP atual: ${percentHP}`)
    console.log(`HP min: ${percentHPMin}`)

    if (percentHP > percentHPMin) {
        console.log('Não preciso me curar')
        return;
    }

    console.log('Preciso me curar')
    await curarHPMinimo();

    console.log('Preciso comprar cura')
    await comprarComida();
}

async function getMinHP(): Promise<number> {
    return await getFromStorage<number>("minLife");
}

async function getHP(): Promise<number> {
    await execute('getHP');
    return await getFromStorage<number>("percentHP");
}

async function obterQtdComidaInv() {
    console.log("vou obter qtd comida");
    await execute('obterQtdComidaInv');
    return await getFromStorage<number>('qtdComidaInv');
}

async function curarHPMinimo(): Promise<void> {
    console.log('vou abrir o inventário');
    await execute('abrirVistaGeral');

    let minHP = await getMinHP();
    let hp = await getHP();

    while (hp < minHP) {
        await execute('curar');
        await timeout(3000);

        let qtdComidas = await getFromStorage("qtdComidasInv")
        console.log(`qtd comidas ${qtdComidas}`)
        if (qtdComidas == 0) {
            console.log("Acabou as comidas!!!");
            return;
        }

        hp = await getHP();
    }
}

export async function comprarComida() {
    console.log("vou abrir os bens gerais")
    await execute('abrirBensGerais');

    await timeout(1000);

    console.log("vou abrir a tab comidas")
    await execute('abrirTabComidas');

    let qtdComida = await obterQtdComidaInv();
    let qtdComidaMin = await getFromStorage<number>('qtdComidaMin');

    console.log(`Qtd Comida atual: ${qtdComida}`)
    console.log(`Qtd Comida min: ${qtdComidaMin}`)

    if (qtdComida > qtdComidaMin) {
        console.log("não preciso comprar comida")
        return;
    }

    console.log("vou comprar comida")
    await execute('comprarComida');
    await timeout(3000);
}



