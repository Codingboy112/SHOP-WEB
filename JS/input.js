let colorsArr = document.querySelectorAll(".colors__wrapper");
let sizeDivsWrapper = document.querySelectorAll(".size__divs_wrapper");

let uniqueColors = [...new Set(products.flatMap((product) => product.colors))];
let sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

function enterInp(arr, parentElement, type, isDekstop) {
  parentElement.innerHTML = "";
  if (type == "radio") {
    arr.forEach((el) => {
      let createRadio = document.createElement("input");
      createRadio.setAttribute("type", "radio");
      createRadio.setAttribute("name", "sameColor");
      createRadio.setAttribute("value", el);
      if (isDekstop) {
        createRadio.setAttribute("class", `colorIn color${el} dekstopRadios`);
      } else {
        createRadio.setAttribute("class", `colorIn color${el} mobileRadios`);
      }
      createRadio.style.backgroundColor = el;

      parentElement.appendChild(createRadio);
    });
  } else if (type == "checkbox") {
    arr.forEach((el) => {
      let createCheckbox = document.createElement("input");
      let createLabel = document.createElement("label");
      let createSpan = document.createElement("span");
      createCheckbox.setAttribute("type", "checkbox");
      createCheckbox.setAttribute("value", el);
      if (isDekstop) {
        createCheckbox.setAttribute("class", "dekstopCheckbox");
      } else {
        createCheckbox.setAttribute("class", "mobileCheckbox");
      }

      createSpan.setAttribute("class", "sizeCheckBox");
      createSpan.innerHTML = el;

      createLabel.appendChild(createCheckbox);
      createLabel.appendChild(createSpan);
      parentElement.appendChild(createLabel);
    });
  }
}

enterInp(uniqueColors, colorsArr[1], "radio", true);
enterInp(uniqueColors, colorsArr[0], "radio", false);
enterInp(sizes, sizeDivsWrapper[3], "checkbox", true);
enterInp(sizes, sizeDivsWrapper[1], "checkbox", false);
