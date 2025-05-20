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
