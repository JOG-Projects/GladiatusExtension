import { TipoLog } from "../../../model/infra/tipoLog";
import { doubleClick, doWork, getByXpath, log, tryUntil } from "../../utils";

const QTD_COLUNAS = 8;
const QTD_LINHAS = 5;
const QTD_SLOTS_INV = QTD_COLUNAS * QTD_LINHAS;

doWork('comprarComida', async () => {
    let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

    let slotsVendedor = Array.from(inventarioVendedor.children);

    let comidasCompraveis = slotsVendedor.filter((item: any) => {
        return item.dataset.tooltip && !item.dataset.tooltip.contains('icon_rubies')
    });

    let qtdSlotsVazios = getQtdSlotsVazios();

    await log(TipoLog.info, `QtdItens = ${qtdSlotsVazios}`);
    await log(TipoLog.info, `Slots Vazios = ${qtdSlotsVazios}`);

    for (let i = 0; i < qtdSlotsVazios; i++) {
        let comida = comidasCompraveis.shift();
        doubleClick(comida!);
    }
});

function getQtdSlotsVazios() {
    let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="inv"]');

    let items = Array.from(inventarioPlayer.children).filter(i => Object.keys((i as any).dataset).length > 0);

    let qtdSlotsVazios = QTD_SLOTS_INV - items.length;
    return qtdSlotsVazios;
}
