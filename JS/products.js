let dropdownDiv = document.querySelectorAll(".dropdown__Filter");
let dropdownButton = document.querySelectorAll(".dropdownChanger");
let mainProducWrapper = document.querySelector(".main__products__wrapper");

dropdownButton.forEach((el, i) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("dropdownActive")) {
      el.classList.remove("dropdownActive");
      dropdownDiv[i].style.height = "0";
      el.style.transform = "rotate(0deg)";
    } else {
      el.classList.add("dropdownActive");
      dropdownDiv[i].style.height = "auto";
      el.style.transform = "rotate(180deg)";
    }
  });
});

mainProducWrapper.innerHTML = "";

products.forEach((el) => {

  mainProducWrapper.insertAdjacentHTML(
    "beforeend",
    `
  <a href="./showProduct.html">
        <div class="top-selling__product">
              
                      <img src="${el.image}" alt="" />
                
                    <p class="top-selling__name">${el.title}</p>
                    <p class="productRating">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-half"></i>
                      ${el.rating}/5
                    </p>
                    <div class="top-selling__discount">
                      <p>
                        $${
                          el.discount > 0
                            ? Math.round(
                                el.price - (el.price / 100) * el.discount
                              )
                            : el.price
                        } <del class="top-selling__realPrice"> ${
      el.discount > 0 ? `${el.price}$` : ""
    }</del>
                      </p>
                     ${
                       el.discount > 0
                         ? ` <span class="top-selling__percent">-${el.discount}%</span>`
                         : ""
                     }
                    </div>
                  </div>
  </a>
    `
  );
});
