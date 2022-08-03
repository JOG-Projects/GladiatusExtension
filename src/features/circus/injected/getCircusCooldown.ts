import { getAtkCooldown } from "../../ataque_utils";
import { doWork } from "../../utils";


doWork(async () => await getAtkCooldown('//*[@id="cooldown_bar_text_ct"]', "circusCooldown"));