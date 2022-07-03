(async () => {
    try {        
        let percentHP = getByXpath('//*[@id="header_values_hp_percent"]').innerHTML;

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1));
        await log({type: "info", message: `Valor percentual do HP obtido: ${percentHP}`});

    } catch (e) {
        await logError(e);
    }
})();