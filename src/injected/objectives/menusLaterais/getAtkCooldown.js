(async () => {
    try {
        let textCooldown = getByXpath('//*[@id="cooldown_bar_text_arena"]').innerHTML

        let timeSegments = textCooldown.split(":")

        let hours = Number(timeSegments[0] ?? 0)
        let minutes = Number(timeSegments[1] ?? 0)
        let seconds = Number(timeSegments[2] ?? 0)

        await setStorage("atkCooldown", { seconds: seconds, minutes: minutes })
    } catch (e) {
        console.error(e)
    }
})();