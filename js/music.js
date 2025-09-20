const buttons = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll(".content-section");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Прибираємо активний клас у всіх кнопок
        buttons.forEach(b => b.classList.remove("active"));
        // Додаємо активний клас до натиснутої
        btn.classList.add("active");

        // Ховаємо всі секції
        sections.forEach(sec => sec.classList.add("hidden"));

        // Відображаємо потрібну секцію
        const target = btn.getAttribute("data-target");
        document.getElementById(target).classList.remove("hidden");
    });
});

function playSong(file) {
    const player = document.getElementById("player");
    player.src = file;
    player.play();
}