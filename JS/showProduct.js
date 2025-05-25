let navigatorImage = document.querySelectorAll(".navigator__image");
let fullImage = document.querySelector(".fullImage");
let productTitle = document.querySelector(".product__title");
let productRating = document.querySelector(".product__stars");
let productRatingText = document.querySelector(".product__ratingText");
let productDiscountPrice = document.querySelector(".product__discountPrice");
let productRealPrice = document.querySelector(".product__realPrice");
let productDiscount = document.querySelector(".product__discount");
let productAbout = document.querySelector(".product__about");
let colorsWrapper = document.querySelector(".colors__wrapper");
let productSizeText = document.querySelector(".size__divs_wrapper");
let productDecrease = document.querySelector(".product__decrease");
let productIncrease = document.querySelector(".product__increase");
let productCount = document.querySelector(".productCount");
let buyCartButton = document.querySelector(".buyCartButton");
let currentCount = 0;
let showReviews = document.querySelector(".showReviews");
let suggestedWrapper = document.querySelector(".suggested__wrapper");

// Finding the product
let getId = new URLSearchParams(window.location.search).get("id");
let foundProduct = products.find((el) => el.id == getId);

const navigatorImgs = [
  foundProduct.navigatorImg1,
  foundProduct.navigatorImg2,
  foundProduct.navigatorImg3,
];

//small images

navigatorImgs.forEach((img, index) => {
  navigatorImage[index].setAttribute("src", img || foundProduct.image);
  navigatorImage[index].addEventListener("click", () => {
    fullImage.setAttribute("src", navigatorImage[index].src);
  });
});

// big image

fullImage.setAttribute("src", foundProduct.image);

//name

productTitle.innerHTML = foundProduct.title;

// rating

let starIcons = "";
for (let i = 1; i <= 5; i++) {
  if (i <= Math.floor(foundProduct.rating)) {
    starIcons += '<i class="bi bi-star-fill"></i>';
  } else if (i - foundProduct.rating < 1) {
    starIcons += '<i class="bi bi-star-half"></i>';
  } else {
    starIcons += '<i class="bi bi-star"></i>';
  }
}

productRating.innerHTML = starIcons;

productRatingText.innerHTML = `${foundProduct.rating}/<span>5</span>`;

// Pricing

productDiscountPrice.innerHTML =
  foundProduct.discount > 0
    ? `$${(
        foundProduct.price -
        (foundProduct.price / 100) * foundProduct.discount
      ).toFixed(2)}`
    : `$${foundProduct.price.toFixed(2)}`;

productRealPrice.innerHTML =
  foundProduct.discount > 0 ? `$${foundProduct.price}` : "";

if (foundProduct.discount > 0) {
  productDiscount.innerHTML = `${foundProduct.discount}%`;
} else {
  productDiscount.remove();
}

// information

productAbout.innerHTML = foundProduct.about;

// colors

enterInp(foundProduct.colors, colorsWrapper, "radio", true);

// sizes

enterInp(foundProduct.sizes, productSizeText, "checkbox", true);

// increase and decrease

productCount.innerHTML = currentCount;

productDecrease.addEventListener("click", () => {
  if (currentCount == 0) return;
  currentCount--;
  productCount.innerHTML = currentCount;
});

productIncrease.addEventListener("click", () => {
  currentCount++;
  productCount.innerHTML = currentCount;
});

// add to cart

buyCartButton.addEventListener("click", () => {
  const cartItem = {
    product: foundProduct,
    quantity: currentCount,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.product.id === foundProduct.id
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += currentCount;
  } else {
    cart.push(cartItem);
  }

  currentCount = 0;
  productCount.innerHTML = currentCount;

  localStorage.setItem("cart", JSON.stringify(cart));
});

// --------------------------------- comments ---------------

showReviews.innerHTML = "";
foundProduct.comments.forEach((el) => {
  let starIcons = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(el.userRate)) {
      starIcons += '<i class="bi bi-star-fill"></i>';
    } else if (i - el.userRate < 1) {
      starIcons += '<i class="bi bi-star-half"></i>';
    } else {
      starIcons += '<i class="bi bi-star"></i>';
    }
  }

  showReviews.insertAdjacentHTML(
    "beforeend",
    `
          <div class="user__review">
              <div class="userReview__rate">
                ${starIcons}
              </div>
              <p class="user__reviewName">
                ${el.user} <i class="bi bi-check-circle-fill"></i>
              </p>
              <p class="user__reviewText">
                ${el.comment}
              </p>
              <p class="user__reviewDate">Posted on ${el.posted}</p>
            </div>  
        `
  );
});

// suggested Items
let similarItems = products.filter(
  (el) => el.category === foundProduct.category && el.id !== foundProduct.id
);

// Clear the wrapper **before** the loop


suggestedWrapper.innerHTML = "";

similarItems.forEach((el) => {
  const discountPrice = (el.price - (el.price / 100) * el.discount).toFixed(2);
  const hasDiscount = el.discount > 0;

  suggestedWrapper.insertAdjacentHTML(
    "beforeend",
    `
      <div class="suggested__product">
        <img src="${el.image}" alt="" />
        <p class="suggestedProduct__name">${el.title}</p>
        <div class="suggestedProduct__rating">
          <div class="product__stars">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <p class="productRatingText">${el.rating}/<span>5</span></p>
        </div>
        <div class="suggested__productPricing">
          <p class="discointPrice">${
            hasDiscount ? `$${discountPrice}` : `$${el.price.toFixed(2)}`
          }</p>
          ${
            hasDiscount
              ? `<del class="realPrice"><p>$${el.price}</p></del><span class="discountPercent">-${el.discount}%</span>`
              : ""
          }
        </div>
      </div> 
    `
  );
});
