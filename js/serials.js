const media = [
    { title: "Inception", type: "Фільм", genre: "Фантастика", year: 2010, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" },
    { title: "Breaking Bad", type: "Серіал", genre: "Драма", seasons: 5, status: "Завершений", year: 2008, rating: 9.5, poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
    { title: "Interstellar", type: "Фільм", genre: "Наукова фантастика", year: 2014, rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
    { title: "Stranger Things", type: "Серіал", genre: "Фантастика", seasons: 4, status: "Триває", year: 2016, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg" },
    { title: "The Dark Knight", type: "Фільм", genre: "Екшн", year: 2008, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { title: "Game of Thrones", type: "Серіал", genre: "Фентезі", seasons: 8, status: "Завершений", year: 2011, rating: 9.3, poster: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg" }
];

const mediaList = document.getElementById("mediaList");
let selectedGenre = "all";

function renderMedia() {
    mediaList.innerHTML = "";

    media
        .filter(item =>
            selectedGenre === "all" || item.genre === selectedGenre
        )
        .forEach(item => {
            const card = document.createElement("div");
            card.className = "media-card";
            card.innerHTML = `
            <img class="poster" src="${item.poster}" alt="${item.title}">
            <div class="media-content">
              <div class="media-title">${item.title}</div>
              ${item.type === "Фільм"
                    ? `<div class="info-row">${item.genre}</div>`
                    : `<div class="info-row">${item.genre} • ${item.seasons} сезонів • ${item.status}</div>`
                }
              <div class="footer-row">
                <span>${item.year}</span>
                <span class="rating">${item.rating}/10</span>
              </div>
            </div>
          `;
            mediaList.appendChild(card);
        });
}

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
        renderMedia();
    });
});

document.addEventListener("click", e => {
    if (!genreSelect.contains(e.target)) {
        options.style.display = "none";
    }
});

renderMedia();