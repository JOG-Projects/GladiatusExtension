import { doWork, tryUntil, clickAndWait } from "../../utils";

doWork("abrirArena", async () => clickAndWait('//*[@id="cooldown_bar_ct"]/a'));