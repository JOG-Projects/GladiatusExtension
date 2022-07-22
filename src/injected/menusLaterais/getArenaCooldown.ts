import { getByXpath, setStorage, log, doWork, tryUntil } from "../../services/utils";
import { Cooldown } from "../../services/model/cooldown";
import { TipoLog } from "../../services/model/tipoLog";
import { getAtkCooldown } from "../../services/service_utils";

doWork("getArenaCooldown", async () => {
    await tryUntil(async () => await getAtkCooldown('//*[@id="cooldown_bar_text_arena"]', "arenaCooldown"));
});