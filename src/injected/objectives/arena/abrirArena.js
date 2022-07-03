(async () => {
    try {
        await clickAndWait('//*[@id="cooldown_bar_arena"]/a', 2500)
        await log({type: "info", message: "Arena aberta"})
    } catch (e) {
        await log({type: "error", message: `${e}`})
    }
})();