let arrivalsWrapper = document.querySelector(".arrivals__wrapper");

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

function displayArrivals(arr) {
  arrivalsWrapper.innerHTML = "";
  let lastFour = arr.slice(-4);

  lastFour.forEach((el) => {
    let calculatedOriginal =
      el.discount > 0
        ? Math.round(el.price - (el.price / 100) * el.discount)
        : el.price;

    let starIcons = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(el.rating)) {
        starIcons += '<i class="bi bi-star-fill"></i>';
      } else if (i - el.rating < 1) {
        starIcons += '<i class="bi bi-star-half"></i>';
      } else {
        starIcons += '<i class="bi bi-star"></i>';
      }
    }

    arrivalsWrapper.insertAdjacentHTML(
      "beforeend",
      `
     <a href="./showProduct.html?id=${el.id}">
        <div class="arrival_product" data-id="${el.id}">
              <img src="${el.image}" alt="" />
              <p class="arriva_name">${el.title}</p>
              <p class="productRating">
                ${starIcons}
                ${el.rating}/5
              </p>
              <div class="arrival__discount">
                <p>$${calculatedOriginal} ${
        el.discount > 0
          ? `<del class="realArrivalPrice"> $${el.price}</del>`
          : ""
      }</p>
                ${
                  el.discount > 0
                    ? `<span class="arrivalDisPercent">-20%</span>`
                    : ""
                }
              </div>
            </div>
            </a>
      `
    );
  });
}

displayArrivals(products);
