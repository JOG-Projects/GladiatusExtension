import { doWork, setStorage, getByXpath } from "../../utils";

doWork("obterQtdComidaInv", async () => getQntComida());

async function getQntComida(): Promise<void> {
    let inventario = getByXpath<HTMLElement>('//*[@id="content"]/table/tbody/tr/td[2]/div[6]/div');
    await setStorage('qtdComidaInv', inventario.children.length);
}