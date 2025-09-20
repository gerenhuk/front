const cards = document.querySelectorAll(".recommended__games-card");
const preview = document.getElementById("gamePreview");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        const imgUrl = card.getAttribute("data-image");
        preview.src = imgUrl;
        preview.style.display = "block";
    });

    card.addEventListener("mousemove", (e) => {
        preview.style.left = e.pageX + "px";
        preview.style.top = (e.pageY - 100) + "px";
    });

    card.addEventListener("mouseleave", () => {
        preview.style.display = "none";
    });
});