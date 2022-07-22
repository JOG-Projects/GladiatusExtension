import { execute } from "../../utils";

export async function equiparPreset() {
    await execute('abrirVistaGeral');
    await execute('selecionarEquipamento');
}

export async function selecionarInventario(){
    await execute('selecionarInventario');
}