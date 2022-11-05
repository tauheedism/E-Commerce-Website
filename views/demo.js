//to remove an item

var removeItem = document.getElementsByClassName("btn-danger");
for (let i = 0; i < removeItem.length; i++) {
  const button = removeItem[i];
  button.addEventListener("click", removeCartItem);
}

function removeCartItem(event) {
  let buttonClick = event.target;
  button.parentElement.parentElement.remove();
  updateCartTotal();
}

// quantity changed

var quantityInput = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantityInput.length; i++) {
  const input = quantityInput[i];
  input.addEventListener("click", quantiCheck);
}

function quantiCheck(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// add to cart button

var classOfcart = document.getElementsByClassName("shop-itme-button");
for (let i = 0; i < classOfcart.length; i++) {
  var item = classOfcart[i];
  item.addEventListener("click", addToCart);
}

function addToCart(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageUrl = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageUrl);
  updateCartTotal();
}

function addItemToCart(title, price, imageUrl) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageUrl}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// order

document
  .getElementsByClassName("order class")[0]
  .addEventListener("click", ordersClick);

function ordersClick() {
  alert("Thanku for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNode()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

// total updation

function updateCartTotal() {
  var cartItemsContainer = document.getElementsByClassName("cart-rows")[0];
  var cartRows = cartItemsContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantityElement = cartRow.getElementsByClassName("cart-quantity-input");
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
