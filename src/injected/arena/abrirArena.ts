import { clickAndWait, doWork } from "../../services/utils";

doWork("abrirArena", 2500, async () => {
    clickAndWait('//*[@id="cooldown_bar_arena"]/a');
});