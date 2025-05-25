let leftProducts = document.querySelector(".left__products");
let cartProducts = JSON.parse(localStorage.getItem("cart"));
let subtotalPrice = document.querySelector(".subtotalPrice");
let mainDiscountPercentText = document.querySelector(".mainDiscountPercent");
let discountedMinusPriceText = document.querySelector(".discountedMinusPrice");
let totalPrice = document.querySelector(".totalPrice");
let promocodeApply = document.querySelector(".promocode__apply");
let promocodeAdd = document.querySelector(".promocodeAdd");
let orderMainPrice;
let promocodeCheckout = document.querySelector(".promocode__checkout");
let promocodeLists = "FLASH50X";

function showCartPro(arr) {
  leftProducts.innerHTML = "";
  if (arr.length === 0) {
    leftProducts.innerHTML = "No products added yet";
  } else {
    arr.forEach((el, index) => {
      leftProducts.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cart_product" data-index='${index}'>
                <div class="imgDiv"><img src="${
                  el.product.image
                }" alt="" /></div>
                <div class="cart__detail">
                  <div class="cart__titleAndDelete">
                    <p class="cart__title2">${el.product.title}</p>
                    <i class="bi bi-trash-fill deleteBtn" data-action="delete"></i>
                  </div>
                  <p class="cart__size">Size: <span>${
                    el.size ? el.size : "Not selected"
                  }</span></p>
                  <p class="cart__color">Color: <span>${
                    el.color ? el.color : "Not selected"
                  }</span></p>
                  <div class="cart__priceAndCount">
                    <p class="cart__price">$${el.product.price}</p>
                    <div class="cart__count">
                      <button class="cart__decrease" data-action="decrease">–</button>
                      <p class="cart__countText">${el.quantity}</p>
                      <button class="increase" data-action="increase">+</button>
                    </div>
                  </div>
                </div>
              </div>
        `
      );
    });

    document
      .querySelectorAll(".cart__decrease, .increase, .deleteBtn")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let index = e.target.closest(".cart_product").dataset.index;
          let action = e.target.dataset.action;

          if (action == "increase") {
            cartProducts[index].quantity++;
          } else if (
            action === "decrease" &&
            cartProducts[index].quantity > 1
          ) {
            cartProducts[index].quantity--;
          } else if (action === "delete") {
            cartProducts.splice(index, 1);
          }
          localStorage.setItem("cart", JSON.stringify(cartProducts));
          showCartPro(cartProducts);
          calculateAndDisplay(cartProducts);
        });
      });
  }
}

showCartPro(cartProducts);

// main price calculation

function calculateAndDisplay(arr) {
  let subtotal = arr.reduce(
    (acc, el) => acc + el.product.price * el.quantity,
    0
  );

  let totalDiscountedPrice = arr.reduce((acc, el) => {
    let discountAmount = (el.product.price * el.product.discount) / 100;
    return acc + (el.product.price - discountAmount) * el.quantity;
  }, 0);
  let mainDiscountPercent = Math.round(
    100 - (totalDiscountedPrice / subtotal) * 100
  );
  let discountedMinusPrice = Math.round(subtotal - totalDiscountedPrice);

  subtotalPrice.innerHTML = `$${subtotal}`;
  mainDiscountPercentText.innerHTML = `-${mainDiscountPercent}%`;
  discountedMinusPriceText.innerHTML = `-$${discountedMinusPrice}`;
  orderMainPrice = totalDiscountedPrice + 15;

  totalPrice.innerHTML = `$${orderMainPrice}`;
}

calculateAndDisplay(cartProducts);

promocodeApply.addEventListener("click", () => {
  if (promocodeAdd.value.trim() == "") return;

  if (promocodeAdd.value.trim() == promocodeLists) {
    orderMainPrice -= 10;
    totalPrice.innerHTML = `$${orderMainPrice}`;
  }
});

promocodeCheckout.addEventListener("click", () => {
  const productIds = cartProducts.map((el) => el.product.id);
  const productIdsStr = productIds.join(", ");
  const botToken = "7762618689:AAE6Jtq2RScMuyeUcfXEPTkQJzD1cra-tQA";
  const chatId = "6959013020";
  let orderPhoneNumber = prompt("Please Enter your phone number");
  let orderLocation = prompt("Please enter order location");
  const message = `
  UserPhoneNumber: ${orderPhoneNumber}
  UserLocation: ${orderLocation}
  UserCart: ${productIdsStr}
  UserTotal: ${orderMainPrice}$
  `;
  localStorage.setItem('cart', JSON.stringify([])); 
  cartProducts = JSON.parse(localStorage.getItem("cart"));
  showCartPro(cartProducts)
  calculateAndDisplay(cartProducts);

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Message sent:", data))
    .catch((error) => console.error("Error sending message:", error));
});
