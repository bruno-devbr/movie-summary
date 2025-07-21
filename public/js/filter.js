import {
    Alldata,
    cardsDiv,
    buildCard,
    resetCurrentIndex,
    loadMore,
} from "./cards.js";

const applyBtn = document.querySelector("#apply");

export function getInputs() {
    const inputsYear = document.querySelectorAll(
        "#year-options > span > input"
    );
    const inputsGenre = document.querySelectorAll(
        "#genre-options > span > input"
    );

    applyBtn.addEventListener("click", () => {
        getTexts(inputsYear, inputsGenre);
    });
}

export const yearArray = [];
export const genreArray = [];

function getTexts(inputsYear, inputsGenre) {
    yearArray.length = 0; // limpa o array antes de popular de novo
    genreArray.length = 0;

    inputsYear.forEach((year) => {
        if (year.checked === true) {
            const yearText = year.parentElement.textContent.trim();
            yearArray.push(yearText);
        }
    });

    inputsGenre.forEach((genre) => {
        if (genre.checked === true) {
            const genreText = genre.parentElement.textContent.trim();
            genreArray.push(genreText);
        }
    });

    setFilter();
}

function setFilter() {
    // Se não tem filtro, mostra tudo
    const filteredData = Alldata.filter((movie) => {
        const yearMatch =
            yearArray.length === 0 || yearArray.includes(String(movie.year));
        const genreMatch =
            genreArray.length === 0 ||
            genreArray.some((g) => movie.genres.includes(g));

        return yearMatch && genreMatch;
    });

    cardsDiv.innerHTML = ""; // limpa os cards atuais
    resetCurrentIndex(); // reseta índice de paginação se usar

    filteredData.forEach((movie) => buildCard(movie));
}

const cancelBtn = document.querySelector("#cancel");
const filterinput = document.querySelectorAll(".filter-check");

function clearFilter() {
    const inputsYear = document.querySelectorAll(
        "#year-options > span > input"
    );
    const inputsGenre = document.querySelectorAll(
        "#genre-options > span > input"
    );

    filterinput.forEach((input) => {
        input.checked = false;
    });

    inputsYear.forEach((year) => (year.checked = false));
    inputsGenre.forEach((genre) => (genre.checked = false));

    yearArray.length = 0;
    genreArray.length = 0;

    cardsDiv.innerHTML = ""; // limpa os cards
    resetCurrentIndex(); // reseta o índice
    loadMore(Alldata); // carrega a primeira batch
}

cancelBtn.addEventListener("click", clearFilter);
