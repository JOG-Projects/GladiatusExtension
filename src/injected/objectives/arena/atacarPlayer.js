(async () => {
    try {
        await tryUntil();
        await clickAndWait('//*[@id="content"]/article/section/form/p[2]/input[2]', 1000);
    } catch (e) {
        await logError(e);
    }
})();

async function setPlayerName() {
    let inputNome = getByXpath('//*[@id="ujn"]');
    let player = await getFromStorage("currentAtkPlayer");
    inputNome.value = player;
    await log({ type: "info", message: `Inserindo nome para ser atacado: ${player}` });
}

async function tryUntil() {
    try {
        await setPlayerName();
    } catch
    {
        await timeout(200);
        await tryUntil();
    }
}