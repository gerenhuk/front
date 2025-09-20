document.addEventListener("DOMContentLoaded", () => {
    const hotkeys = document.querySelectorAll(".combination, .combination-key");
    const toast = document.getElementById("hotkey-toast");

    hotkeys.forEach(el => {
        el.addEventListener("click", () => {
            const text = el.textContent.trim();

            // Підсвітка на пів секунди
            el.classList.add("flash");
            setTimeout(() => el.classList.remove("flash"), 500);

            // Копіювання в буфер
            navigator.clipboard.writeText(text).catch(() => {
                console.warn("Не вдалося скопіювати");
            });

            // Показати toast
            toast.textContent = text;
            toast.classList.add("show");

            // Забрати toast через 1.5с
            setTimeout(() => {
                toast.classList.remove("show");
            }, 1500);
        });
    });
});
