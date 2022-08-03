import { getAtkCooldown } from "../../ataque_utils";
import { doWork, tryUntil } from "../../utils";


doWork(async () => await getAtkCooldown('//*[@id="cooldown_bar_text_arena"]', "arenaCooldown"));