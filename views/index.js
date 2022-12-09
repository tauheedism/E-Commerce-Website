const cart_items = document.querySelector("#cart .cart-items");

const open = document.getElementById("open");
const close = document.getElementById("close");
const container = document.getElementById("cart-cross");

open.addEventListener("click", () => {
  container.classList.add("active");
});

close.addEventListener("click", () => {
  container.classList.remove("active");
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`http://localhost:4000/limited?page=0`)
    .then((products) => {
      console.log(products.data.products);
      let parentElement = document.getElementById("rows");
      let output = products.data.products;
      let container = "";
      for (let i = 0; i < output.length; i++) {
        let title = output[i].title;
        let imageUrl = output[i].imageUrl;
        let price = output[i].price;
        let prodId = output[i].id;
        container += `
            <div class="bag">
                <h4 class="bag-title" >${title}</h4>
               <img src="${imageUrl}"  class="images" alt="" width="100%" height="200px">
               <div class="price-cart">
                <h3 class="price">${price}</h3>
               </div>   
              <button type="button" class="addtocart" id="btn" onClick="addToCartClicked(${prodId})">ADD TO CART</button>
            </div>`;
      }
      parentElement.innerHTML = container;
    })
    .catch((err) => {
      console.log(err);
    });
    getCartDetails();
    pagination();
});

//AddtoCartCLICKED

function addToCartClicked(productId) {
  axios
    .post("http://localhost:4000/cart", { productId: productId })
    .then((response) => {
      if (response.status === 200) {
        NotifyUser(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
      getCartDetails();
    })

    .catch((errMsg) => {
      console.log(errMsg);
      NotifyUser(errMsg);
    });
}

// /  TO PRODUCT ADDEE SUCCESSFULLY NOTIFICATION

function NotifyUser(message) {
  const container = document.getElementById("container");
  const Notifi = document.createElement("div");
  Notifi.classList.add("notifi");
  Notifi.innerText = `${message}`;
  container.appendChild(Notifi);

  setTimeout(() => {
    Notifi.remove();
  }, 3000);
}

// getCartDetails

function getCartDetails() {
  axios
    .get("http://localhost:4000/cart")
    .then((response) => {
      console.log(response);
      let parentElement = document.getElementById("cart-item");
      let container = "";
      for (let i = 0; i < response.data.products.length; i++) {
        const title = response.data.products[i].title;
        let imageUrl = response.data.products[i].imageUrl;
        let price = response.data.products[i].price;
        let prodId = response.data.products[i].id;
        container += `
            <div class="show-cart">
              <div class="cart-items-row-column">
                <img src="${imageUrl}" class="cart-images" alt="" width="50" >
                <span class="cart-title">${title}</span>
              </div>
            
              <div >
                <span class="cart-price">${price}</span>
                <input type="number"  class="cart-row-item-quantity"  value="1">
                <button class="cart-item-remove-button" onclick="removeItem(${prodId})">REMOVE</button>
              </div>
            </div>`;
      }
      parentElement.innerHTML = container;
      updateCartTotal();
    })
    .catch((err) => console.log(err));
}

//removing Item

function removeItem(prodId) {
  axios
    .delete(`http://localhost:4000/cart-delete-item/${prodId}`)
    .then((result) => {
      if (result.status == 200) {
        var removeButtonClicked = document.getElementsByClassName(
          "cart-item-remove-button"
        );
        for (var i = 0; i < removeButtonClicked.length; i++) {
          var button = removeButtonClicked[i];
          button.addEventListener("click", removeCartItem);
        }
      } else {
        throw new Error();
      }
    })
    .catch((err) => console.log(err));
}

//Removing CartItem function

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}


//pagination logic

let c = 0;
let cc = 1;
let pag = document.getElementById('pagination');

function pagination(e) {
    axios.get("http://localhost:4000/products")
    .then((productInfo)=>{
        console.log(productInfo.data)
      let number_of_pages;
      if(productInfo.data.products.length % 2 == 0) {
         number_of_pages = Math.trunc(((productInfo.data.products.length)/2))
      } else {
         number_of_pages = Math.trunc(((productInfo.data.products.length)/2)+1)
      }

      for (let i = 0; i < number_of_pages; i++) {
        pag.innerHTML += `<button class="pagebtn" id="?page=${c++}">${cc++}</button> `;
        console.log(pag)
      }
    })
    .catch(err=> NotifyUser(err))
  }

  pag.addEventListener('click', (e)=>{
    let id = e.target.id;
    console.log(id)
    axios.get(`http://localhost:4000/limited${id}`)
    .then(productInfo=>{
        console.log(productInfo.data.products)
      let products = productInfo.data.products;
       let container="";
        let parent = document.getElementById("rows");
       for( let i =0;i<productInfo.data.products.length;i++)
       {
        let title = productInfo.data.products[i].title;
        console.log(title)
        let imageSrc = productInfo.data.products[i].imageUrl;
        let price = productInfo.data.products[i].price;
        let prod = productInfo.data.products[i].id;
         container+=` <div class="bag">
                 <h4 class="bag-title" >${title}</h4>
               <img src="${imageSrc}"  class="images" alt="" width="300px" height="300px">
               <div class="price-cart">
                      <h3 class="price">${price}</h3>  
                  <button type="button" class="addtocart" id="btn" onClick="addToCartClicked(${prod})">ADD TO CART</button>
                </div>
             </div>`
       }


        parent.innerHTML = container;
    })
    .catch(err=> console.log(err))
  })


  // Order

  function updateCartTotal()
{
      var cartItemContainer = document.getElementsByClassName('cart-items')[0]
      var cartRows = cartItemContainer.getElementsByClassName('show-cart'); 
      var total =0;
      console.log(cartRows)
      for(var i =0; i<cartRows.length;i++)
      {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-row-item-quantity')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = quantityElement.value
        total = total + (price*quantity);

      }
      total = Math.round(total);
      document.getElementsByClassName('total-purchase-price')[0].innerText = '$' + total;
}

const purchaseBtn = document.getElementById('purchase-btn');

purchaseBtn.addEventListener('click',(productId)=>{
    console.log("purchaseid")
    axios.post(`http://localhost:4000/CreateOrder`,{productId : productId})
   .then(response =>{
    console.log("purchase",response)
   })
    .catch(err =>console.log(err))
})
