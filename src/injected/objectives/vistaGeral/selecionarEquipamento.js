(async () => {
    try {
        await clickAndWait('//*[@id="char"]/div[10]/div', 1000);
        await log({type: "info", message: 'Selecionando equipamento'});

    } catch (e) {
        await logError(e);
    }
})();