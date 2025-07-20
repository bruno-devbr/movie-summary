import { getData } from "./api.js";

let data = [];
let currentIndex = 0;
const batchSize = 10;

const cardsDiv = document.querySelector(".cards");
const main = document.querySelector("main"); // container rolável

const sentinela = document.createElement("div");
sentinela.classList.add("sentinela");

// TODO: caso nao tenha a imagem ponha uma div dizendo que imagem not Found
function buildCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = movie.thumbnail;

    const year_titleDiv = document.createElement("div");
    year_titleDiv.classList.add("year-title");

    const h3 = document.createElement("h3");
    h3.textContent = movie.title;

    const spanYear = document.createElement("span");
    spanYear.textContent = movie.year;

    year_titleDiv.append(h3, spanYear);

    const genreDiv = document.createElement("div");
    genreDiv.classList.add("genre");

    const spanGenre = document.createElement("span");
    spanGenre.textContent = movie.genres.join(", ");

    genreDiv.appendChild(spanGenre);

    const p = document.createElement("p");
    p.textContent = movie.extract;

    card.append(img, year_titleDiv, genreDiv, p);
    cardsDiv.appendChild(card);
}

function loadMore() {
    const end = Math.min(currentIndex + batchSize, data.length);
    for (let i = currentIndex; i < end; i++) {
        buildCard(data[i]);
    }
    currentIndex = end;
    cardsDiv.appendChild(sentinela); // sentinela sempre no final
}

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting && currentIndex < data.length) {
            loadMore();
        }
    },
    {
        root: main, // OBSERVA o container rolável
        rootMargin: "100px",
    }
);

async function init() {
    data = await getData();
    loadMore();
    cardsDiv.appendChild(sentinela);
    observer.observe(sentinela);
}

init();
