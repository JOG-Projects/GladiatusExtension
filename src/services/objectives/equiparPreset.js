import { execute } from "../background_utils";

export async function equiparPreset() {
    await execute('src/injected/objectives/vistaGeral/abrirVistaGeral.js');
    await execute('src/injected/objectives/vistaGeral/selecionarEquipamento.js');
}