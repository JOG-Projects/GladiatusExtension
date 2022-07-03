(async () => {
    try {
        let qtdComida = document.getElementById('inv').children.length;
        await log({type: "info", message: `Quantidade comida ${qtdComida}`})
        
        await setStorage('qtdComida', qtdComida);
    } catch (e) {
        await logError(e);
    }
})();