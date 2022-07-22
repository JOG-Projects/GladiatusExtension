import { doWork, getByXpath } from "../../utils";

doWork('comprarComida', async () => {
    let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

    let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="inv"]');

    let slotsVendedor = Array.from(inventarioVendedor.children);

    let comidasCompraveis = slotsVendedor.filter(x => {
        let comida = x as any;
        return comida.dataset.tooltip && comida.tooltip.contains('icon_rubies')
    });

    let slots = Array.from(inventarioPlayer.children);

    let matrix = getInventoryMatrix(slots);

    let slotsVazios = slots.filter(x => x.className == "ui-droppable grid-droparea");

    let banana = getByXpath('//*[@id="shop"]/div[6]')

    let cuzeta = getByXpath('//*[@id="shop"]/div[6]')

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

function getInventoryMatrix(slots: Element[]) {
    let rows = []
    for (let x = 1; x < 6; x++) {
        let row = [];
        for (let y = 1; y < 9; y++) {
            let hasItem = slots.some(el => verifyPositions(x, y, el));
            row.push(hasItem);
        }
        rows.push(row);
    }
    return rows;
}

function verifyPositions(x: number, y: number, el: Element) {
    let element = el as any;
    return element.dataset.positionX == x && element.dataset.positionY == y;
}