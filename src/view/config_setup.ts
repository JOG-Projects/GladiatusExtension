import { registerListeners } from "../services/utils";

registerListeners(
    [
        { id: 'atkListPlayers', default: "" },
        { id: 'delay', default: 1000 },
        { id: 'minLife', default: 20 }
    ]);