import { doubleClick, doWork, getByXpath, setStorage } from "../../utils";

doWork(async () => {
    let inventarioVendedor = getByXpath<HTMLElement>('//*[@id="shop"]');

    let slotsVendedor = Array.from(inventarioVendedor.children);

    let comidasSemCash = slotsVendedor.filter((item: any) => item.dataset.tooltip && !item.dataset.tooltip.includes('icon_rubies'))

    if(comidasSemCash.length === 0)
    {
        await setStorage('curaComprada', false);
        return;
    }

    let comidasCompraveisPreco = comidasSemCash.map((itemCompravel: any) => {
        return {
            price: itemCompravel.dataset.priceGold as number,
            item: itemCompravel as Element
        }
    });

    let itemCompra = comidasCompraveisPreco[0];

    doubleClick(itemCompra.item)
    await setStorage('curaComprada', true);
});

function getDinheiroAtual(): number {
    let element = getByXpath('//*[@id="sstat_gold_val"]')
    return Number(element.textContent?.replace(".", ""));
}