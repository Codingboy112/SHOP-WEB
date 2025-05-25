let dropdownDiv = document.querySelectorAll(".dropdown__Filter");
let dropdownButton = document.querySelectorAll(".dropdownChanger");
let mainProducWrapper = document.querySelector(".main__products__wrapper");
let changingType = document.querySelector("#changingType");
let clearInp = document.querySelector("#clearInp");
let rangePriceFilter = document.querySelectorAll(".rangePriceFilter");
let rangePriceValShow = document.querySelectorAll(".rangePriceValShow");
let applyFilter = document.querySelectorAll(".applyFilter");

let currentArr;

// mainFil
let getStyle = new URLSearchParams(window.location.search).get("type");

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

// display the product

function displayProducts(arr) {
  mainProducWrapper.innerHTML = "";

  arr.forEach((el) => {
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

    mainProducWrapper.insertAdjacentHTML(
      "beforeend",
      `
  <a href="./showProduct.html?id=${el.id}">
        <div class="top-selling__product">
              
                      <img src="${el.image}" alt="" />
                
                    <p class="top-selling__name">${el.title}</p>
                    <p class="productRating">
                    ${starIcons}
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
}

if (getStyle) {
  if (getStyle == "All") {
    displayProducts(products);
    changingType.innerHTML = "All";
    currentArr = [...products];
    let maxPrice = Math.max(...products.map((p) => p.price));
    rangePriceFilter[0].max = maxPrice;
    rangePriceFilter[1].max = maxPrice;
    rangePriceValShow[0].innerHTML = `Maximum Price: ${maxPrice}$`;
    rangePriceValShow[1].innerHTML = `Maximum Price: ${maxPrice}$`;
  } else {
    let filteredTypes = [...products].filter((el) => el.category == getStyle);
    currentArr = filteredTypes;
    displayProducts(filteredTypes);
    changingType.innerHTML = getStyle;
    let maxPrice = Math.max(...filteredTypes.map((p) => p.price));
    rangePriceFilter[0].max = maxPrice;
    rangePriceFilter[1].max = maxPrice;
    rangePriceValShow[0].innerHTML = `Maximum Price: ${maxPrice}$`;
    rangePriceValShow[1].innerHTML = `Maximum Price: ${maxPrice}$`;
  }
} else {
  displayProducts(products);
  currentArr = products;
  changingType.innerHTML = "All";
  let maxPrice = Math.max(...products.map((p) => p.price));
  rangePriceFilter[0].max = maxPrice;
  rangePriceFilter[1].max = maxPrice;
  rangePriceValShow[0].innerHTML = `Maximum Price: ${maxPrice}$`;
  rangePriceValShow[1].innerHTML = `Maximum Price: ${maxPrice}$`;
}

function desktopFilter(arr) {
  let filteredArr = [...arr];

  let selectedRadio = [...document.querySelectorAll(".dekstopRadios")].find(
    (radio) => radio.checked
  );

  let selectedColor = selectedRadio ? selectedRadio.value : null;

  let selectedCheckboxes = [...document.querySelectorAll(".dekstopCheckbox")]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (selectedCheckboxes.length > 0) {
    console.log("working if");

    filteredArr = filteredArr.filter((el) =>
      el.sizes.some((size) => selectedCheckboxes.includes(size))
    );
  }

  if (selectedColor) {
    filteredArr = filteredArr.filter((el) => el.colors.includes(selectedColor));
  }

  filteredArr = filteredArr.filter((el) => {
    const finalPrice =
      el.discount > 0 ? el.price - (el.price * el.discount) / 100 : el.price;
    return finalPrice <= parseFloat(rangePriceFilter[1].value);
  });

  displayProducts(filteredArr);
}

function mobileFilter(arr) {
  let filteredArr = [...arr];

  let selectedRadio = [...document.querySelectorAll(".mobileRadios")].find(
    (radio) => radio.checked
  );

  let selectedColor = selectedRadio ? selectedRadio.value : null;

  let selectedCheckboxes = [...document.querySelectorAll(".mobileCheckbox")]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (selectedCheckboxes.length > 0) {
    console.log("working if");

    filteredArr = filteredArr.filter((el) =>
      el.sizes.some((size) => selectedCheckboxes.includes(size))
    );
  }

  if (selectedColor) {
    filteredArr = filteredArr.filter((el) => el.colors.includes(selectedColor));
  }

  filteredArr = filteredArr.filter((el) => {
    const finalPrice =
      el.discount > 0 ? el.price - (el.price * el.discount) / 100 : el.price;
    return finalPrice <= parseFloat(rangePriceFilter[0].value);
  });

  displayProducts(filteredArr);
}

applyFilter[1].addEventListener("click", () => {
  desktopFilter(currentArr);
});
applyFilter[0].addEventListener("click", () => {
  mobileFilter(currentArr);
});

rangePriceFilter[1].addEventListener("input", () => {
  rangePriceValShow[1].innerHTML = `Maximum Price: ${rangePriceFilter[1].value}$`;
});

rangePriceFilter[0].addEventListener("input", () => {
  rangePriceValShow[0].innerHTML = `Maximum Price: ${rangePriceFilter[0].value}$`;
});

