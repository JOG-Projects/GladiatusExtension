(async () => {
    try {
        await timeout(1000)
        
        let percentHP = getByXpath('//*[@id="header_values_hp_percent"]').innerHTML

        await setStorage("percentHP", percentHP.slice(0, percentHP.length - 1))
    } catch (e) {
        console.error(e)
    }
})();