import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, getByXpath, log } from "../../utils";

const QTD_COLUNAS = 8;
const QTD_LINHAS = 5;
const QTD_SLOTS_INV = QTD_COLUNAS * QTD_LINHAS;

doWork('comprarComida', async () => {
    let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

    let slotsVendedor = Array.from(inventarioVendedor.children);

    let comidasCompraveis = slotsVendedor.filter((item: any) => item.dataset.tooltip && !item.dataset.tooltip.includes('icon_rubies'))

    let comidasCompraveisPreco = comidasCompraveis.map((itemCompravel: any) => {
        return {
            price: itemCompravel.dataset.priceGold,
            item: itemCompravel
        }
    });

    await log(TipoLog.info, `Comidas compraveis: ${comidasCompraveis.length}`)

    let qtdItens = getQtdItensInv();
    let slotsVazios = QTD_SLOTS_INV - qtdItens;

    await log(TipoLog.info, `Qtd Itens = ${qtdItens}`);
    await log(TipoLog.info, `Qtd Slots Vazios = ${slotsVazios}`);

    let dinheiroAtual = getDinheiroAtual();
    await log(TipoLog.info, `Dinheiro atual: ${dinheiroAtual}`);

    let comprados = 0;
    for (let i = 0; i < slotsVazios; i++) {
        let comidaPreco = comidasCompraveisPreco.shift();
        await log(TipoLog.info, `Preco: ${comidaPreco?.price}`)
        if (dinheiroAtual > Number(comidaPreco?.price)) {
            doubleClick(comidaPreco?.item);
            comprados++;
        }
    }
    await log(TipoLog.info, `Acabei de comprar ${comprados} drops`)
});

function getQtdItensInv(): number {
    let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="content"]/table/tbody/tr/td[2]/div[6]/div');

    return inventarioPlayer.children.length;
}

function getDinheiroAtual(): number {
    let element = getByXpath('//*[@id="sstat_gold_val"]')
    return Number(element.textContent?.replace(".", ""));
}