import type { User } from "./interfaces";
const search = document.getElementById("search") as HTMLFormElement;
const avatarka = document.getElementById("avatarka") as HTMLImageElement;
const name = document.getElementById("name") as HTMLHeadingElement;
const userName = document.getElementById("userName") as HTMLLinkElement;
const joined = document.getElementById("joined") as HTMLParagraphElement;
const repos = document.getElementById("repos") as HTMLParagraphElement;
const bio = document.getElementById("bio") as HTMLParagraphElement;
const followers = document.getElementById("followers") as HTMLParagraphElement;
const following = document.getElementById("following") as HTMLParagraphElement;
const location = document.getElementById("location") as HTMLParagraphElement;
const blog = document.getElementById("link") as HTMLParagraphElement;
const twitter = document.getElementById("twitter") as HTMLParagraphElement;
const company = document.getElementById("company") as HTMLParagraphElement;
const locationSvg = document.querySelector(".location__info svg") as SVGElement;
const twitterSvg = document.querySelector(".twitter__info svg") as SVGElement;
const linkSvg = document.querySelector(".link__info svg") as SVGElement;
const companySvg = document.querySelector(".company__info svg") as SVGElement;

export const updateUi = (user: User) => {
  search?.addEventListener("submit", (e) => {
    e.preventDefault();
    avatarka.src = user.avatar_url;
    name.textContent = user.name ? user.name : "Not Aviable";
    userName.textContent = ` @${user.login}`;
    joined.textContent = `Joined ${new Date(user.created_at).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    )}`;
    repos.textContent = user.public_repos;
    bio.textContent = user.bio ? user.bio : "This profile has no bio";
    followers.textContent = user.followers;
    following.textContent = user.following;
    if (user.location) {
      location.textContent = user.location;
      location.classList.remove("disabled");
      location.classList.remove("not-available");
      locationSvg.classList.remove("not-available-svg");
    } else {
      location.classList.add("not-available");
      locationSvg.classList.add("not-available-svg");
      location.textContent = "Not Available";

    }
    if (user.blog) {
      blog.setAttribute("href", user.blog);
      blog.classList.remove("disabled");
      blog.classList.remove("not-available");
      linkSvg.classList.remove("not-available-svg");
    } else {
      blog.textContent = "Not Available";
      blog.removeAttribute("href");
      blog.classList.add("disabled");
      blog.classList.add("not-available");
      linkSvg.classList.add("not-available-svg");
    }
    if (user.twitter_username) {
      twitter.textContent = user.twitter_username;
      twitter.setAttribute("href", user.twitter_username);
      twitter.classList.remove("disabled");
      twitter.classList.remove("not-available");
      twitterSvg.classList.remove("not-available-svg");
    } else {
      twitter.textContent = "Not Avaiable";
      twitter.removeAttribute("href");
      twitter.classList.add("disabled");
      twitter.classList.add("not-available");
      twitterSvg.classList.add("not-available-svg");
    }
    if (user.company) {
      company.textContent = user.company;
      company.classList.remove("disabled");
      company.classList.remove("not-available");
      companySvg.classList.remove("not-available-svg");
    } else {
      company.textContent = "Not Available";
      company.classList.add("disabled");
      company.classList.add("not-available");
      companySvg.classList.add("not-available-svg");
    }
  });
};
