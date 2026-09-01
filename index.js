// JavaScript source code
document.addEventListener("DOMContentLoaded", function () {

    const pianoRoll = document.getElementById("pianoroll");

    if (!pianoRoll) {
        console.warn("[piano] #pianoroll not found");
        return;
    }

    pianoRoll.addEventListener("pointerdown", function (event) {

        const button = event.target.closest("button[data-key]");

        if (!button) return;

        event.preventDefault();

        const key = button.dataset.key;

        console.log("[piano] pressed:", key);

        // Запускаємо AudioContext після дії користувача
        const ctx = ensureAudioContext();

        if (ctx && ctx.state === "suspended") {
            ctx.resume();
        }

        playNoteFromKey(key);
    });

});
