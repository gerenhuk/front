const news = [
    {
        title: "Шахтар переміг у Лізі чемпіонів",
        sport: "Футбол",
        tone: "Позитивний",
        desc: "Донецький клуб здобув важливу перемогу над німецьким суперником з рахунком 2:1...",
        time: "1 година тому"
    },
    {
        title: "Збірна України з баскетболу готується до чемпіонату",
        sport: "Баскетбол",
        tone: "Нейтральний",
        desc: "Національна команда провела останні тренування перед стартом турніру...",
        time: "3 години тому"
    },
    {
        title: "Еліна Світоліна пройшла до наступного кола",
        sport: "Теніс",
        tone: "Позитивний",
        desc: "Українська тенісистка впевнено перемогла суперницю на Australian Open...",
        time: "5 годин тому"
    },
    {
        title: "Нові рекорди у плаванні",
        sport: "Плавання",
        tone: "Позитивний",
        desc: "На чемпіонаті Європи встановлено кілька нових рекордів у різних дисциплінах...",
        time: "1 день тому"
    }
];

const newsList = document.getElementById("newsList");
let selectedSport = "all";

function renderNews() {
    newsList.innerHTML = "";

    news
        .filter(item => selectedSport === "all" || item.sport === selectedSport)
        .forEach(item => {
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
        <div class="news-title">${item.title}
            <div class="sport-news__item">
                <span class="news-meta">${item.sport}</span>
                <span class="tone ${item.tone.toLowerCase()}">${item.tone}</span>
            </div>
        </div>
        
        <div class="news-desc">${item.desc}</div>
        <div class="news-footer">${item.time}</div>
    `;
            newsList.appendChild(card);
        });
}


const sportSelect = document.getElementById("sportSelect");
const selected = sportSelect.querySelector(".selected");
const options = sportSelect.querySelector(".options");
const optionItems = options.querySelectorAll("li");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

optionItems.forEach(item => {
    item.addEventListener("click", () => {
        selected.textContent = item.textContent;
        selected.setAttribute("data-value", item.dataset.value);
        selectedSport = item.dataset.value;

        optionItems.forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        options.style.display = "none";
        renderNews();
    });
});

document.addEventListener("click", e => {
    if (!sportSelect.contains(e.target)) {
        options.style.display = "none";
    }
});

renderNews();