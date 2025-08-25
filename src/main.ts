import "./style.css";
import { getData } from "./request";
import { updateUi } from "./updateUi";
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;
const themeText = document.querySelector(".theme__text") as HTMLSpanElement;
const themeIcon = themeToggle.querySelector("img") as HTMLImageElement;
themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "light");
    themeText.textContent = "Dark";
    themeIcon.src = "../public/images/dark-mood.svg";
    themeIcon.alt = "dark-mood-icon";
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeText.textContent = "Light";
    themeIcon.src = "../public/images/light-mood.svg";
    themeIcon.alt = "light-mood-icon";
  }
});

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
