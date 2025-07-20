import { getData } from "./api.js";

let Alldata = [];
let currentIndex = 0;
const batchSize = 10;

const cardsDiv = document.querySelector(".cards");
const main = document.querySelector("main");

const sentinela = document.createElement("div");
sentinela.classList.add("sentinela");

function verifyData(data) {
    const filtered = data.filter((dt) => {
        return (
            dt.thumbnail !== undefined &&
            dt.title !== undefined &&
            dt.year !== undefined &&
            dt.genres !== undefined &&
            dt.extract !== undefined &&
            dt.href !== undefined
        );
    });

    return filtered;
}

function buildCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = movie.thumbnail;
    image.alt = movie.title;
    image.onerror = () => {
        image.remove();

        const fallback = document.createElement("div");
        fallback.classList.add("no-image");
        fallback.style.height = "300px";

        const icon = document.createElement("ion-icon");
        icon.setAttribute("id", "notFound-icon");
        icon.setAttribute("name", "eye-off");

        // cria o texto
        const text = document.createElement("p");
        text.textContent = "No image available";

        // adiciona ícone e texto no fallback
        fallback.appendChild(icon);
        fallback.append(text);

        card.insertBefore(fallback, card.firstChild);
    };

    const year_titleDiv = document.createElement("div");
    year_titleDiv.classList.add("year-title");

    const h3 = document.createElement("h3");
    h3.textContent = movie.title;

    const spanYear = document.createElement("span");
    spanYear.textContent = movie.year;

    year_titleDiv.append(h3, spanYear);

    const genreDiv = document.createElement("div");
    genreDiv.classList.add("genreSpan");

    const spanGenre = document.createElement("span");
    spanGenre.textContent = movie.genres.join(", ");
    genreDiv.appendChild(spanGenre);

    const p = document.createElement("p");
    p.textContent = movie.extract;

    card.append(image, year_titleDiv, genreDiv, p);
    cardsDiv.appendChild(card);
}

function loadMore(data) {
    const end = Math.min(currentIndex + batchSize, data.length);
    for (let i = currentIndex; i < end; i++) {
        buildCard(data[i]);
    }
    currentIndex = end;
    cardsDiv.appendChild(sentinela);
}

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting && currentIndex < Alldata.length) {
            loadMore(Alldata);
        }
    },
    {
        root: main,
        rootMargin: "100px",
    }
);

async function init() {
    const rawData = await getData();
    Alldata = verifyData(rawData);
    loadMore(Alldata);
    cardsDiv.appendChild(sentinela);
    observer.observe(sentinela);
}

init();
