// Importa a função para pegar os dados
import { getData } from "./api.js";

// Seleciona elementos do DOM
const asideTag = document.querySelector("aside");
const modal = document.querySelector(".modal");
const filterBtn = document.querySelector(".filter-btn");
const applyBtn = document.querySelector("#aplly");
const cancelBtn = document.querySelector("#cancel");

// Mostra o aside e modal, com animação de entrada
async function showAside() {
    asideTag.style.display = "block";
    asideTag.classList.remove("slide-out");
    asideTag.classList.add("slide-in");
    modal.style.display = "block";
}

// Fecha o aside e modal com animação de saída e delay para esconder
function closeAside() {
    asideTag.classList.remove("slide-in");
    asideTag.classList.add("slide-out");

    setTimeout(() => {
        asideTag.style.display = "none";
        modal.style.display = "none";
    }, 300); // tempo da animação em ms
}

// Eventos dos botões para abrir e fechar o aside
filterBtn.addEventListener("click", showAside);
applyBtn.addEventListener("click", closeAside);
cancelBtn.addEventListener("click", closeAside);

// Função para pegar gêneros e anos únicos dos filmes
async function setData() {
    const genresList = [];
    const yearsList = [];

    const data = await getData();

    data.forEach((movie) => {
        // Pega todos os gêneros, sem repetir
        movie.genres.forEach((genre) => {
            if (!genresList.includes(genre)) {
                genresList.push(genre);
            }
        });

        // Pega todos os anos, sem repetir
        if (!yearsList.includes(movie.year)) {
            yearsList.push(movie.year);
        }
    });

    return {
        genres: genresList,
        years: yearsList,
    };
}

// Seleciona divs para colocar os checkboxes de filtro
const genreDiv = document.querySelector("#genre-options");
const yearsDiv = document.querySelector("#year-options");

// Cria checkboxes e labels (span) para gêneros e anos
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

    setInputEvents(); // adiciona eventos aos inputs criados
}

// Seleciona opções e ícones para controle da exibição dos filtros
const spanOpt = document.querySelectorAll(".option");
const arrowIcons = document.querySelectorAll(".down-icon");
const optionsDiv = document.querySelectorAll(".optionsDiv");

// Função para abrir/fechar dropdown de opções ao clicar
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

// Adiciona evento de clique para abrir/fechar dropdown nos spans
spanOpt.forEach((span) => {
    span.addEventListener("click", OptionsDisplay);
});

// Seleciona checkboxes principais (anos e gêneros)
const checkboxMain = document.querySelectorAll(".filter-check");

// Função que adiciona eventos para habilitar/desabilitar filtros principais
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

// Desabilita os checkboxes principais no início
checkboxMain[0].checked = false;
checkboxMain[0].disabled = true;
checkboxMain[1].checked = false;
checkboxMain[1].disabled = true;

// Adiciona eventos para controlar seleção dos checkboxes dentro e fora dos grupos
function inputsEvent(checkbox, element) {
    checkbox.forEach((input) => {
        input.addEventListener("click", () => {
            let algumMarcado = false;

            // Verifica se algum checkbox do grupo está marcado
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                    algumMarcado = true;
                    break;
                }
            }

            // Se algum marcado, habilita checkbox principal, senão desabilita
            if (algumMarcado) {
                element.removeAttribute("disabled");
                element.checked = true;
            } else {
                element.setAttribute("disabled", "true");
                element.checked = false;
            }
        });

        // Se desmarca o checkbox principal, desmarca todos do grupo e desabilita ele
        element.addEventListener("click", () => {
            if (element.checked == false) {
                input.checked = false;
                element.disabled = true;
            }
        });
    });
}

// Função imediata para inicializar o sistema, buscar dados e criar inputs
(async function init() {
    const { genres, years } = await setData();
    createInputs(genres, years);
})();
