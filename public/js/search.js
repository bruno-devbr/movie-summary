import {
    Alldata,
    loadMore,
    buildCard,
    observer,
    sentinela,
    currentIndex,
    resetCurrentIndex,
} from "./cards.js";

const searchInput = document.querySelector("#search-input");
const cardsDiv = document.querySelector(".cards");
searchInput.value = "";

let debounceTimer;

searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const value = searchInput.value.trim().toLowerCase();

        cardsDiv.innerHTML = ""; // limpa os cards
        observer.disconnect(); // para o lazy load

        if (value === "") {
            resetCurrentIndex();
            loadMore(Alldata);
            cardsDiv.appendChild(sentinela);
            observer.observe(sentinela);
            return;
        }

        const filtered = Alldata.filter((movie) =>
            movie.title.toLowerCase().includes(value)
        );

        filtered.forEach(buildCard);
    }, 300); // espera 300ms depois da última tecla
});
