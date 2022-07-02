(async () => {
    try {
        await clickAndWait('//*[@id="mainmenu"]/a[1]', 1000)
    } catch (e) {
        console.error(e)
    }
})();