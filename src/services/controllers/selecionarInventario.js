import { execute } from "../background_utils.js";

export async function selecionarInventario(){
    await execute('src/injected/objectives/vistaGeral/selecionarInventario.js');
}