(async () => {
    try {
        await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2000)
    } catch (e) {
        console.error(e)
    }
})();