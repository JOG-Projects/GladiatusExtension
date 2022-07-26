import { attackArena } from "./arena/controller/arena";
import { attackCircus } from "./circus/controller/circus";
import { checarHP } from "./cura/controller/comprarComida";

export async function main(): Promise<void> {
    //await production();
    await test();
}

async function production(): Promise<void> {
    while (true) {
        await attackArena();

        await attackCircus();
    }
}

async function test(): Promise<void> {
    await checarHP();
}