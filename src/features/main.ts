import { attackArena } from "./arena/controller/arena";
import { attackCircus } from "./circus/controller/circus";
import { checarHP, comprarComida } from "./cura/controller/cura";
import { pantheon } from "./pantheon/controller/pantheonController";

export async function main(): Promise<void> {
    //await production();
    await test();
}

async function production(): Promise<void> {
    while (true) {
        tentarChuparDrops();
        await attackArena();
        await attackCircus();
        await pantheon();
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