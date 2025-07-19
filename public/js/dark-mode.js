const darkBtn = document.querySelector("#btn-dark");
const lightBtn = document.querySelector("#btn-light");
const bodyTag = document.querySelector("body");

function darkMode() {
    bodyTag.classList.add("dark");
    bodyTag.classList.remove("light");
    localStorage.setItem("theme", "dark");
}

function lightMode() {
    bodyTag.classList.add("light");
    bodyTag.classList.remove("dark");
    localStorage.setItem("theme", "light");
}

// Aplica o tema salvo ao carregar a página
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    darkMode();
} else if (savedTheme === "light") {
    lightMode();
}

darkBtn.addEventListener("click", darkMode);
lightBtn.addEventListener("click", lightMode);
