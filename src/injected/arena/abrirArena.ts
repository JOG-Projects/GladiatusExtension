import { clickAndWait, doWork } from "../../services/utils";

doWork("abrirArena", 1000, async () => {
    clickAndWait('//*[@id="cooldown_bar_arena"]/a');
});