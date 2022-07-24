import { attackArena } from "./arena/controller/arena";
import { attackCircus } from "./circus/controller/circus";

export async function main(): Promise<void> {
    await attackArena();

    await attackCircus();
}