import { getAtkCooldown } from "../../ataque_utils";
import { doWork, tryUntil } from "../../utils";


doWork("getCircusCooldown", async () => await getAtkCooldown('//*[@id="cooldown_bar_text_ct"]', "circusCooldown"));