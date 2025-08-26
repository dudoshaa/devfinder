import "./style.css";
import { getData } from "./request";
import { updateUi } from "./updateUi";
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;
const themeText = document.querySelector(".theme__text") as HTMLSpanElement;
const themeIcon = themeToggle.querySelector("img") as HTMLImageElement;

// Theme toggle
themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "light");
    themeText.textContent = "Dark";
    themeIcon.src = "./images/dark-mood.svg";
    themeIcon.alt = "dark-mood-icon";
    localStorage.setItem("theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeText.textContent = "Light";
    themeIcon.src = "./images/light-mood.svg";
    themeIcon.alt = "light-mood-icon";
    localStorage.setItem("theme", "dark");
  }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") {
    themeText.textContent = "Light";
    themeIcon.src = "./images/light-mood.svg";
  } else {
    themeText.textContent = "Dark";
    themeIcon.src = "./images/dark-mood.svg";
  }
}
const search = document.getElementById("search") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const errorMsg = document.querySelector(".error") as HTMLParagraphElement;

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (!inputValue) return;

  getData(`https://api.github.com/users/${inputValue}`)
    .then((data) => {
      if (data.message === "Not Found") {
        errorMsg.textContent = "No results";
        errorMsg.classList.remove("hidden");
        return;
      }
      errorMsg.classList.add("hidden");
      updateUi(data);
    })
    .catch(() => {
      errorMsg.textContent = "No results";
      errorMsg.classList.remove("hidden");
    });
});
