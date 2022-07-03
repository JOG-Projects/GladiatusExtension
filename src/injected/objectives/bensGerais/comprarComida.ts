import { getByXpath } from "../../../services/background_utils";

let inventarioVendedor = getByXpath('//*[@id="shop"]') as HTMLElement;
let inventarioPlayer = getByXpath('//*[@id="inv"]') as HTMLElement;

//verificar comidas compráveis
let slotsVendedor = Array.from(inventarioVendedor.children);
let comidasCompraveis = slotsVendedor.filter(x => x.dataset.tooltip && !x.dataset.tooltip.contains('icon_rubies'));

//array slots vazios
let slots = Array.from(inventarioPlayer.children);
let slotsVazios = slots.filter(x => x.className=="ui-droppable grid-droparea");


inventarioVendedor.addEventListener('dragstart', dragStart);

function dragStart(e: DragEvent | null) {
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