let headerCloseBtn = document.querySelector(".closeTheHead");
let headerWillTop = document.querySelector(".header__wrapper-top__color");

// headerDropdown

let dropdownHeader = document.querySelector(".dropdown__header");
let openDropdown = document.querySelector(".openDropdown");

//comment carousel

const cardList = document.querySelector(".card-list");
const leftArrow = document.querySelector(".bi-arrow-left");
const rightArrow = document.querySelector(".bi-arrow-right");

headerCloseBtn.addEventListener("click", () => {
  headerWillTop.remove();
});

openDropdown.addEventListener("click", () => {
  dropdownHeader.classList.toggle("showDropdown");
});



const scrollAmount = 370;
rightArrow.addEventListener("click", () => {
  cardList.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

leftArrow.addEventListener("click", () => {
  cardList.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});
