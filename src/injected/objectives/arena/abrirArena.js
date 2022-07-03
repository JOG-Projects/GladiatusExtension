(async () => {
    try {
        await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2500)
    } catch (e) {
        console.error(e)
    }
})();