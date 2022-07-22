import { clickAndWait, doWork, tryUntil } from "../../../../infra/utils";

doWork("abrirArena", async () => {
    await tryUntil(async () => clickAndWait('//*[@id="cooldown_bar_arena"]/a'));
});