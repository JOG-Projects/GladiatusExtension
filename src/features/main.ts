import { attackArena } from "./arena/controller/arena";
import { attackCircus } from "./circus/controller/circus";
import { comprarComida } from "./cura/controller/cura";
import { pantheon } from "./pantheon/controller/pantheonController";
import { gerarDrops, getFromStorage, setStorage, timeout } from "./utils";

export async function main(): Promise<void> {
    await production();
    //await test();
}

async function production(): Promise<void> {
    let dropsId = gerarDrops();
    await identificar(dropsId);
    console.log(`Iniciando processo: ${dropsId}`);

    while (true) {
        tentarChuparDrops();
        let clone = await souClone(dropsId);
        if(clone) {
            console.log(`Matando processo: ${dropsId}`);
            return;
        }

        await attackArena();
        await attackCircus();
        await pantheon();

        await timeout(5 * 1000);
    }
}

async function test(): Promise<void> {
    await comprarComida();
}

function tentarChuparDrops() {
    if (Math.floor(Math.random() * 1000) % 1000 == 0) {
        chuparDrops();
    }
}

function chuparDrops() {
    alert("chupei um drops");
}

async function souClone(drops: string): Promise<boolean> {
    let dropsAtual = await getFromStorage<string>("idDrops");

    return dropsAtual != drops;
}

async function identificar(drops: string): Promise<void> {
    await setStorage("idDrops", drops);
}