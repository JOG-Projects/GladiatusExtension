import { execute } from "../background_utils";

export async function equiparPreset() {
    await execute('abrirVistaGeral');
    await execute('selecionarEquipamento');
}