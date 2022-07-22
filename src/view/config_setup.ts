import { registerListeners } from "../services/utils";

registerListeners(
    [
        { id: 'atkListPlayers', default: "", value: "value" },
        { id: 'delay', default: 1000, value: "value" },
        { id: 'minLife', default: 20, value: "value" },
        { id: 'arena', default: false, value: "checked" },
        { id: 'expedicao', default: false, value: "checked" },
        { id: 'circus', default: false, value: "checked" },
        { id: 'masmorra', default: false, value: "checked" },
        { id: 'curar', default: false, value: "checked" },
    ]);