const games = [
    { title: "The Legend of Zelda: Breath of the Wild", genre: "Пригоди", year: 2017, desc: "Революційна гра у відкритому світі", platforms: "Nintendo Switch", rating: 9.7 },
    { title: "Red Dead Redemption 2", genre: "Екшн", year: 2018, desc: "Епічний вестерн про банду Ван дер Лінде", platforms: "PC, PS4, Xbox", rating: 9.8 },
    { title: "Minecraft", genre: "Песочниця", year: 2011, desc: "Безмежна творчість у блочному світі", platforms: "Мультиплатформа", rating: 9.2 },
    { title: "The Witcher 3: Wild Hunt", genre: "RPG", year: 2015, desc: "Епічна RPG про відьмака Ґеральта", platforms: "PC, PS4, Xbox, Switch", rating: 9.8 }
];

const gamesList = document.getElementById("gamesList");
const search = document.getElementById("search");

let selectedGenre = "all";

function renderGames() {
    const searchValue = search.value.toLowerCase();
    gamesList.innerHTML = "";

    games
        .filter(game =>
            (selectedGenre === "all" || game.genre === selectedGenre) &&
            game.title.toLowerCase().includes(searchValue)
        )
        .forEach(game => {
            const card = document.createElement("div");
            card.className = "game-card";
            card.innerHTML = `
            <div class="game-header">
            <div>
                <span class="badge">${game.genre}</span>
                <span class="badge">${game.year}</span>
            </div>
            <span class="rating">${game.rating}/10</span>
            </div>
            <div class="game-title">${game.title}</div>
            <div>${game.desc}</div>
            <div class="platforms">${game.platforms}</div>
        `;
            gamesList.appendChild(card);
        });
}

search.addEventListener("input", renderGames);

// кастомний селект
const genreSelect = document.getElementById("genreSelect");
const selected = genreSelect.querySelector(".selected");
const options = genreSelect.querySelector(".options");
const optionItems = options.querySelectorAll("li");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

optionItems.forEach(item => {
    item.addEventListener("click", () => {
        selected.textContent = item.textContent;
        selected.setAttribute("data-value", item.dataset.value);
        selectedGenre = item.dataset.value;

        optionItems.forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        options.style.display = "none";
        renderGames();
    });
});

document.addEventListener("click", e => {
    if (!genreSelect.contains(e.target)) {
        options.style.display = "none";
    }
});

renderGames();
