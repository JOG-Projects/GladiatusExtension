(async () => {
    try {
        await clickAndWait('//*[@id="submenu1"]/a[6]', 1000)
    } catch (e) {
        console.error(e)
    }
})();