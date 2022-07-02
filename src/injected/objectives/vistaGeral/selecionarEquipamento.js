(async () => {
    try {
        await clickAndWait('//*[@id="char"]/div[10]/div', 1000)
    } catch (e) {
        console.error(e)
    }
})();