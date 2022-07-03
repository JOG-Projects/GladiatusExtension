(async () => {
    try {
        await clickAndWait('//*[@id="shop_nav"]/a[1]/div', 1000);
        await log({type: "info", message: "Aberta tab de comidas do vendedor"});
    } catch (e) {
        await logError(e);
    }
})();