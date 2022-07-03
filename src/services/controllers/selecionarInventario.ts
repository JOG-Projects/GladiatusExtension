import { execute } from "../background_utils";

export async function selecionarInventario(){
    await execute('src/injected/objectives/vistaGeral/selecionarInventario.js');
}