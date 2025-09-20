const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal__close");
const galleryImages = Array.from(document.querySelectorAll(".gallery__img"));
let currentIndex = -1;
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
        currentIndex = index;
    });
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    currentIndex = -1;
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        currentIndex = -1;
    }
});
window.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }
        if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }
        if (e.key === "Escape") {
            modal.style.display = "none";
            currentIndex = -1;
        }
    }
});
const extraFacts = [
    "Коти можуть розвивати швидкість до 48 км/год.",
    "У Стародавньому Єгипті кішок вважали священними тваринами.",
    "У Японії існує острів Аошіма, де котів у десятки разів більше, ніж людей.",
    "Серце кота б’ється приблизно 140–220 разів на хвилину.",
    "Кішки мають унікальний відбиток носа — як у людей відбитки пальців.",
    "Найстаріший кіт прожив 38 років і 3 дні.",
    "Коти спілкуються з людьми частіше, ніж із іншими котами."
];
const randomBtn = document.getElementById("randomFactBtn");
const factResult = document.getElementById("randomFactResult");
randomBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * extraFacts.length);
    factResult.textContent = "🐾 " + extraFacts[randomIndex];
});
