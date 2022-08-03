import { constants } from "../../../model/constants";
import { doWork, getByXpath, setStorage } from "../../utils";

doWork(async () => {
    let qtdItens = getQtdItensInv();
    let slotsVazios = constants.QTD_SLOTS_INV - qtdItens;
    await setStorage("slotsVazios", slotsVazios);
});

function getQtdItensInv(): number {
    let inventarioPlayer = getByXpath<HTMLElement>('//*[@id="content"]/table/tbody/tr/td[2]/div[6]/div');
    return inventarioPlayer.children.length;
}