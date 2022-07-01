(async () => {
    try {
        let inputNome = getByXpath('//*[@id="ujn"]')
        inputNome.value = await getFromStorage("currentAtkPlayer");

        await clickAndWait('//*[@id="content"]/article/section/form/p[2]/input[2]')
    } catch (e) {
        console.error(e)
    }
})();