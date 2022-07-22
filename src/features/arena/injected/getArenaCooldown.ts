import { getAtkCooldown } from "../../ataque_utils";
import { doWork, tryUntil } from "../../utils";


doWork("getArenaCooldown", async () => {
    await tryUntil(async () => await getAtkCooldown('//*[@id="cooldown_bar_text_arena"]', "arenaCooldown"));
});