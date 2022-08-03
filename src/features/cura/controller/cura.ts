import { execute, getFromStorage, timeout } from "../../utils";

export async function checarHP(): Promise<void> {
    let curarAtivado = await getFromStorage<boolean>("curar");
    if (!curarAtivado) {
        console.log("Cura desabilitada!!!");
        return;
    }
    await checkComprarComida();

    await curarHPMinimo();
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

    while (true) {
        console.log(`HP atual: ${hp}`)
        console.log(`HP min: ${minHP}`)

        if (hp > minHP) {
            console.log('Não preciso me curar')
            return;
        }

        let qtdComidas = await obterQtdComidaInv();
        console.log(`qtd comidas ${qtdComidas}`);

        if (qtdComidas == 0) {
            console.log("Acabou as comidas!!!");
            await comprarComida();
        }

        console.log('Preciso me curar')

        hp = await usarItemCura();

    }
}

async function usarItemCura() {
    await execute('curar');
    await timeout(3000);
    console.log("Me curei")
    return await getHP();
}

export async function checkComprarComida() {
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

    console.log('Preciso comprar cura')
    await comprarComida();
}

async function comprarComida() {
    console.log("vou comprar comida");

    await execute('getSlotsVazios');
    let slotsVazios = await getFromStorage<number>('slotsVazios');
    console.log(`Slots vazios: ${slotsVazios}`);

    for (let i = 0; i < slotsVazios; i++) {
        await execute('comprarComida');
        let comprou = await getFromStorage<boolean>('curaComprada');

        if (!comprou) {
            console.log(`SEM COMIDAS PARA COMPRAR!!!`);
            return;
        }

        await timeout(500);
    }

    await timeout(2000);
    console.log("comprei comida");
}
