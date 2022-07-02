(async () => {
    try {
        await clickAndWait('//*[@id="shop_nav"]/a[1]/div', 1000)
    } catch (e) {
        console.error(e)
    }
})();