import { execute } from "../utils";

export async function equiparPreset() {
    await execute('abrirVistaGeral');
    await execute('selecionarEquipamento');
}