import { getData } from "./api.js";

function verifyData(data) {
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

function getUrl() {
    const params = new URLSearchParams(window.location.search);
    const href = params.get("href");

    if (href) {
        const parts = href.split("/");
        const name = parts[parts.length - 1]; // ex: "batman_the"
        return name.replace(/_/g, " "); // troca _ por espaço
    }
}

function verifyUrl(data, href) {
    data.forEach((dt) => {
        const title = dt.title.toLowerCase();

        if (title === href) {
            buildCard(dt);
            return;
        }
    });
}

const card = document.querySelector(".movie-container");

function buildCard(movie) {
    const infosDiv = card.querySelector(".movie-info");

    const img = card.querySelector(".movie-image > img");
    const h2 = infosDiv.querySelector("#title");
    const year = infosDiv.querySelector("#year");
    const genres = infosDiv.querySelector("#genres");
    const casts = infosDiv.querySelector("#casts");
    const extract = document.querySelector("#extract");
    const link = document.querySelector(".btn-container > a");

    h2.textContent = movie.title;
    year.textContent = movie.year;
    genres.textContent = movie.genres.join(", ");
    casts.textContent = movie.cast.join(", ");
    extract.textContent = movie.extract;
    link.setAttribute("href", `https://en.wikipedia.org/wiki/${movie.href}`);

    img.onerror = () => {
        img.remove();

        const fallback = document.createElement("div");
        fallback.classList.add("no-image");
        fallback.style.height = "100%"; // ou o que preferir

        const icon = document.createElement("ion-icon");
        icon.setAttribute("id", "notFound-icon");
        icon.setAttribute("name", "eye-off");

        const text = document.createElement("p");
        text.textContent = "No image available";

        fallback.appendChild(icon);
        fallback.appendChild(text);

        const imgParent = document.querySelector(".movie-image");
        imgParent.appendChild(fallback);
    };

    img.setAttribute("src", movie.thumbnail);
}

async function init() {
    const href = getUrl();

    const Alldata = await getData();
    const data = verifyData(Alldata);

    verifyUrl(data, href);
}

init();
