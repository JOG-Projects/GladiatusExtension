import { atkPlayers } from "./objectives/atkPlayers.js";
import { selecionarInventario } from "./objectives/selecionarInventario.js";

export async function main() {

    await equiparPreset()
    //await selecionarInventario() função posssivelmente sem uso, abrindo a primeira aba do inventário. 
    await atkPlayers()
    
    //outras
}