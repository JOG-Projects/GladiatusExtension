(async () => {
    try {
        let textCooldown = getByXpath('//*[@id="cooldown_bar_text_arena"]').innerHTML.replace(":", "")

        let l = textCooldown.length;

        let seconds = Number(textCooldown.slice(l - 2, l))
        let minutes = Number(textCooldown.slice(l - 4, l - 2))

        await setStorage("atkCooldown", { seconds: seconds, minutes: minutes })
    } catch (e) {
        console.error(e)
    }
})();