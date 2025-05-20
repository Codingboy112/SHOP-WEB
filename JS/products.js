let dropdownDiv = document.querySelectorAll(".dropdown__Filter");
let dropdownButton = document.querySelectorAll(".dropdownChanger");

dropdownButton.forEach((el, i) => {
  el.addEventListener("click", () => {
    if (el.classList.contains('dropdownActive')) {
      el.classList.remove('dropdownActive');
      dropdownDiv[i].style.height = "0";
      el.style.transform = "rotate(0deg)"
    } else{
      el.classList.add('dropdownActive')
      dropdownDiv[i].style.height = "auto";
            el.style.transform = "rotate(180deg)"
    }
  });
});
