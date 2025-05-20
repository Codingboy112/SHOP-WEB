const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');

rangeMin.addEventListener('input', () => {
  if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
    rangeMin.value = rangeMax.value;
  }
  minPrice.textContent = `$${rangeMin.value}`;
});

rangeMax.addEventListener('input', () => {
  if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
    rangeMax.value = rangeMin.value;
  }
  maxPrice.textContent = `$${rangeMax.value}`;
});
