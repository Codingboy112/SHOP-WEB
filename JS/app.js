let arrivalsWrapper = document.querySelector(".arrivals__wrapper");
let topWrapper = document.querySelector(".top-selling__wrapper");

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
                    ? `<span class="arrivalDisPercent">-${el.discount}%</span>`
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

function displayTop(arr) {
  topWrapper.innerHTML = "";

  let topFour = [...arr].sort((a, b) => b.rating - a.rating);

  for (let i = 0; i < 4; i++) {
    let starIcons = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(topFour[i].rating)) {
        starIcons += '<i class="bi bi-star-fill"></i>';
      } else if (i - topFour[i].rating < 1) {
        starIcons += '<i class="bi bi-star-half"></i>';
      } else {
        starIcons += '<i class="bi bi-star"></i>';
      }
    }

    let calculatedOriginal =
      topFour[i].discount > 0
        ? Math.round(
            topFour[i].price - (topFour[i].price / 100) * topFour[i].discount
          )
        : topFour[i].price;

    topWrapper.insertAdjacentHTML(
      "beforeend",
      `
     <a href="./showProduct.html?id=${topFour[i].id}">
       <div class="top-selling__product">
              <img src="${topFour[i].image}" alt="" />
              <p class="top-selling__name">${topFour[i].title}</p>
              <p class="productRating">
               ${starIcons}
                ${topFour[i].rating}/5
              </p>
              <div class="top-selling__discount">
                <p>$${calculatedOriginal} ${
        topFour[i].discount > 0
          ? ` <del class="top-selling__realPrice">${topFour[i].price}</del>`
          : ""
      }</del></p>
                ${
                  topFour[i].discount > 0
                    ? `<span class="top-selling__percent">-${topFour[i].discount}%</span>`
                    : ""
                }
              </div>
            </div>
            </a>
      `
    );
  }
}

displayTop(products);
