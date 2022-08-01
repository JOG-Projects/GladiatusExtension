import { doWork, tryUntil, clickAndWait } from "../../utils";

doWork("abrirCircus", async () => clickAndWait('//*[@id="cooldown_bar_ct"]/a'));