import { getData } from "./api.js";

let Alldata = [];
let currentIndex = 0;
const batchSize = 10;

export const cardsDiv = document.querySelector(".cards");
const main = document.querySelector("main");

const sentinela = document.createElement("div");
sentinela.classList.add("sentinela");

export function verifyData(data) {
    return data.filter((dt) => {
        return (
            dt.thumbnail !== undefined &&
            dt.title !== undefined &&
            dt.year !== undefined &&
            Array.isArray(dt.genres) &&
            dt.genres.length > 0 &&
            dt.extract !== undefined &&
            dt.href !== undefined &&
            Array.isArray(dt.cast) &&
            dt.cast.length > 0
        );
    });
}

export function buildCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    const titleSlug = movie.title.toLowerCase().replace(/\s+/g, "_"); // substitui espaços por underline
    link.setAttribute("href", `movie.html?href=/wiki/${titleSlug}`);

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

        const text = document.createElement("p");
        text.textContent = "No image available";

        fallback.appendChild(icon);
        fallback.append(text);

        link.insertBefore(fallback, link.firstChild);
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

    link.append(image, year_titleDiv, genreDiv, p);
    card.appendChild(link);

    cardsDiv.appendChild(card);
}

export function loadMore(data) {
    const end = Math.min(currentIndex + batchSize, data.length);
    for (let i = currentIndex; i < end; i++) {
        buildCard(data[i]);
    }
    currentIndex = end;
    cardsDiv.appendChild(sentinela);
}

export function resetCurrentIndex() {
    currentIndex = 0;
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

export { Alldata, observer, sentinela, currentIndex };
