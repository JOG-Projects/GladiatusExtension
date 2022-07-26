import { TipoLog } from "../../../model/infra/tipoLog";
import { doWork, getByXpath, log, tryUntil } from "../../utils";

const QTD_COLUNAS = 8;
const QTD_LINHAS = 5;
const QTD_SLOTS_INV = QTD_COLUNAS * QTD_LINHAS;

doWork('comprarComida', async () => {
    let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

    let slotsVendedor = Array.from(inventarioVendedor.children);

    await tryUntil(async () => {
        // let comidasCompraveis = slotsVendedor.filter(x => {
        //     let comida = x as any;
        //     return comida.dataset.tooltip && !comida.dataset.tooltip.contains('icon_rubies')
        // });
    })

    let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="inv"]');

    let items = Array.from(inventarioPlayer.children).filter(i => Object.keys((i as any).dataset).length > 0);

    let qtdSlotsVazios = QTD_SLOTS_INV - items.length;

    await log(TipoLog.info, `QtdItens = ${qtdSlotsVazios}`);
    await log(TipoLog.info, `Slots Vazios = ${qtdSlotsVazios}`);
    //trigger_drop(banana, cuzeta);
})


// function trigger_drop(item: Element, localizacao: Element) {
//     console.log("tentando arrastar...")
//     let draggable = item.draggable();
//     let droppable = localizacao.droppable();

//     let droppableOffset = droppable.offset();
//     let draggableOffset = draggable.offset();
//     let dx = droppableOffset.left - draggableOffset.left;
//     let dy = droppableOffset.top - draggableOffset.top;

//     draggable.simulate("drag", { dx: dx, dy: dy });

//     console.log("arrastei...")
// }

function buyFood(matrix: boolean[][], comidasCompraveis: Element[]) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 8; y++) {
            if (!matrix[x][y]) {

                //arrastar a primeira comida compravel para a matrix[y][x]

                matrix[x][y] = true;
            }
        }
    }
}

function verifySlot(x: number, y: number, el: Element) {
    let element = el as any;
    return element.dataset.positionX == x && element.dataset.positionY == y;
}