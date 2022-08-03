import { registerListeners } from "../features/utils";

registerListeners(
    [
        { id: 'atkListPlayers', default: "", value: "value" },
        { id: 'minLife', default: 20, value: "value" },
        { id: 'arena', default: false, value: "checked" },
        { id: 'circus', default: false, value: "checked" },
        { id: 'curar', default: false, value: "checked" },
        { id: 'qtdComidaMin', default: 10, value: "value" },
        { id: 'expedicao', default: false, value: "checked" },
        { id: 'pantheon', default: false, value: "checked" },
    ]);