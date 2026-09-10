// JavaScript source code
document.addEventListener("DOMContentLoaded", function () {
	console.log("index.js is running")
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

    const site = document.querySelectorAll('.site');

    site.forEach((e) => {

        var child = document.createElement("div");

        child.classList.add("site");
        child.innerHTML = e.innerHTML;

        child.style.display = "none";
        

        document.body.appendChild(child);

        makeDraggable(e, child);
    });


    function makeDraggable(parent, child) {

        let dragging = false;
        let startX, startY;
        let originalLeft, originalTop;

        parent.addEventListener("mousedown", (event) => {

            event.preventDefault();

            // показуємо child
            child.style.position = "fixed";
            child.style.display = "block";
            child.style.zIndex = "1000";

            const rect = parent.getBoundingClientRect();

            originalLeft = rect.left;
            originalTop = rect.top;

            // початкова позиція child
            child.style.left = originalLeft + "px";
            child.style.top = originalTop + "px";

            child.style.width = rect.width + "px";
            child.style.height = rect.height + "px";
            

            startX = event.clientX;
            startY = event.clientY;


            dragging = true;

            console.log("Захоплено");
        });


        document.addEventListener("mousemove", (event) => {

            if (!dragging) return;

            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            child.style.left = originalLeft + dx + "px";
            child.style.top = originalTop + dy + "px";
        });


        document.addEventListener("mouseup", () => {

            if (!dragging) return;

            dragging = false;

            // повертаємо / ховаємо
            child.style.display = "none";

            console.log("Відпущено");
        });
    }
});

