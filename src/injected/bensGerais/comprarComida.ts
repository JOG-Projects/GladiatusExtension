// @ts-nocheck
import { getByXpath } from "../../services/utils";

let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="inv"]');

let slotsVendedor = Array.from(inventarioVendedor.children);

let comidasCompraveis = slotsVendedor.filter(x => x.dataset.tooltip && !x.dataset.tooltip.contains('icon_rubies'));

let slots = Array.from(inventarioPlayer.children);

let matrix = getInventoryMatrix(slots);

let slotsVazios = slots.filter(x => x.className == "ui-droppable grid-droparea");

let cuzinho = getByXpath('//*[@id="shop"]/div[15]')

let cuzeta = getByXpath('//*[@id="shop"]/div[9]')

inventarioVendedor.addEventListener('dragstart', dragStart);

trigger_drop(cuzinho, cuzeta);

function trigger_drop(item, localizacao) {
    let draggable = item.draggable();
    let droppable = localizacao.droppable();

    let droppableOffset = droppable.offset();
    let draggableOffset = draggable.offset();
    let dx = droppableOffset.left - draggableOffset.left;
    let dy = droppableOffset.top - draggableOffset.top;

    draggable.simulate("drag", { dx: dx, dy: dy });
}

function buyFood(matrix: boolean[][], comidasCompraveis: Element[]) {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 8; x++) {
            if(!matrix[y][x]){

                //arrastar a primeira comida compravel para a matrix[y][x]

                matrix[y][x] = true;
            }
        }        
    }
}

function getInventoryMatrix(slots: Element[]) {
    let rows = []
    for (let y = 1; y < 6; y++) {
        let row = [];
        for (let x = 1; x < 9; x++) {
            let hasItem = slots.some(el => verifyPositions(x, y, el));
            row.push(hasItem);
        }
        rows.push(row);
    }
    return rows;
}

function verifyPositions(x: number, y: number, el: Element) {
    return el.dataset.positionX == x && el.dataset.positionY == y;
}

function dragStart(e: DragEvent) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}


/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});


function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}