(async () => {
    try {        
        let percentHP = getByXpath('//*[@id="header_values_hp_percent"]').innerHTML

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1))
    } catch (e) {
        console.error(e)
    }
})();