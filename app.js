let headerCloseBtn = document.querySelector(".closeTheHead");
let headerWillTop = document.querySelector(".header__wrapper-top__color");
let dropdownHeader = document.querySelector(".dropdown__header");
let openDropdown = document.querySelector(".openDropdown");

headerCloseBtn.addEventListener("click", () => {
  headerWillTop.remove();
});

openDropdown.addEventListener("click", () => {
  dropdownHeader.classList.toggle("showDropdown");
});
