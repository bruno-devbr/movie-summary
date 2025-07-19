import { getData } from "./api.js";

const asideTag = document.querySelector("aside");
const modal = document.querySelector(".modal");

const filterBtn = document.querySelector(".filter-btn");

const applyBtn = document.querySelector("#aplly");
const cancelBtn = document.querySelector("#cancel");

async function showAside() {
    asideTag.style.display = "block"; // <- aqui!
    asideTag.classList.remove("slide-out");
    asideTag.classList.add("slide-in");
    modal.style.display = "block";
}

function closeAside() {
    asideTag.classList.remove("slide-in");
    asideTag.classList.add("slide-out");

    setTimeout(() => {
        asideTag.style.display = "none";
        modal.style.display = "none";
    }, 300); // mesmo tempo da animação (0.9s = 900ms)
}

filterBtn.addEventListener("click", showAside);

applyBtn.addEventListener("click", closeAside);
cancelBtn.addEventListener("click", closeAside);

async function setData() {
    const genresList = [];
    const yearsList = [];

    const data = await getData();

    data.forEach((movie) => {
        movie.genres.forEach((genre) => {
            if (!genresList.includes(genre)) {
                genresList.push(genre);
            }
        });

        if (!yearsList.includes(movie.year)) {
            yearsList.push(movie.year);
        }
    });

    return {
        genres: genresList,
        years: yearsList,
    };
}

const genreDiv = document.querySelector("#genre-options");
const yearsDiv = document.querySelector("#year-options");

function createInputs(genres, years) {
    genreDiv.innerHTML = "";
    yearsDiv.innerHTML = "";

    for (let i = 0; i < genres.length; i++) {
        const checkbox = document.createElement("input");
        const span = document.createElement("span");

        checkbox.setAttribute("type", "checkbox");

        span.textContent = genres[i];
        span.append(checkbox);
        genreDiv.append(span);
    }

    for (let i = 0; i < years.length; i++) {
        const checkbox = document.createElement("input");
        const span = document.createElement("span");

        checkbox.setAttribute("type", "checkbox");

        span.textContent = years[i];
        span.append(checkbox);
        yearsDiv.append(span);
    }

    setInputEvents();
}

const spanOpt = document.querySelectorAll(".option");
const arrowIcons = document.querySelectorAll(".down-icon");

const optionsDiv = document.querySelectorAll(".optionsDiv");

function OptionsDisplay(event) {
    const icon = event.currentTarget.querySelector("ion-icon");
    const iconId = icon.id;

    arrowIcons.forEach((element, index) => {
        if (element.id === iconId) {
            if (!element.classList.contains("open")) {
                element.classList.remove("close");
                element.classList.add("open");
                optionsDiv[index].style.display = "flex";
            } else {
                element.classList.remove("open");
                element.classList.add("close");
                optionsDiv[index].style.display = "none";
            }
        }
    });
}

spanOpt.forEach((span) => {
    span.addEventListener("click", OptionsDisplay);
});

const checkboxMain = document.querySelectorAll(".filter-check");

function setInputEvents() {
    let checkbox;

    checkboxMain.forEach((element, index) => {
        if (index == 0) {
            checkbox = yearsDiv.querySelectorAll("input");
        } else {
            checkbox = genreDiv.querySelectorAll("input");
        }

        inputsEvent(checkbox, element);
    });
}

checkboxMain[0].checked = false;
checkboxMain[0].disabled = true;

checkboxMain[1].checked = false;
checkboxMain[1].disabled = true;

function inputsEvent(checkbox, element) {
    checkbox.forEach((input) => {
        input.addEventListener("click", () => {
            let algumMarcado = false;

            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                    algumMarcado = true;
                    break;
                }
            }

            if (algumMarcado) {
                element.removeAttribute("disabled");
                element.checked = true;
            } else {
                element.setAttribute("disabled", "true");
                element.checked = false;
            }
        });

        element.addEventListener("click", () => {
            if (element.checked == false) {
                input.checked = false;
                element.disabled = true;
            }
        });
    });
}

(async function init() {
    const { genres, years } = await setData();
    createInputs(genres, years);
})();
