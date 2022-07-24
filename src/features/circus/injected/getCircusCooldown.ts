import { getAtkCooldown } from "../../ataque_utils";
import { doWork, tryUntil } from "../../utils";


doWork("getCircusCooldown", async () => {
    await tryUntil(async () => await getAtkCooldown('//*[@id="cooldown_bar_ct"]/a', "circusCooldown"));
});