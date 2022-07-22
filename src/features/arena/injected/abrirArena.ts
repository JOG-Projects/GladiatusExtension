import { doWork, tryUntil, clickAndWait } from "../../utils";

doWork("abrirArena", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="cooldown_bar_arena"]/a'));
});