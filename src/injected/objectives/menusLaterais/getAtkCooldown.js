(async () => {
    try {
        await timeout(1000)

        let textCooldown = getByXpath('//*[@id="cooldown_bar_text_arena"]').innerHTML.replace(":", "")

        let l = textCooldown.length;

        let seconds = Number(textCooldown.slice(l - 2, l) ?? 0)
        let minutes = Number(textCooldown.slice(l - 4, l - 2) ?? 0)

        await setStorage("atkCooldown", { seconds: seconds, minutes: minutes })
    } catch (e) {
        console.error(e)
    }
})();