(async () => {
    try {
        await clickAndWait('//*[@id="inventory_nav"]/a[1]', 1000)
    } catch (e) {
        console.error(e)
    }
})();