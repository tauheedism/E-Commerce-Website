const cart_items = document.querySelector("#cart .cart-items");

const parentNode = document.getElementById("music-content");


const parentContainer = document.getElementById("EcommerceContainer");
parentContainer.addEventListener("click", (e) => {
  // if (e.target.className == "shop-item-button") {
  //   const id = e.target.parentNode.parentNode.id;
  //   const name = document.querySelector(`#${id} h3`).innerText;
  //   const img_src = document.querySelector(`#${id} img`).src;
  //   const price =
  //     e.target.parentNode.firstElementChild.firstElementChild.innerText;
  //   let total_cart_price = document.querySelector("#total-value").innerText;
  //   if (document.querySelector(`#in-cart-${id}`)) {
  //     alert("This item is already added to the cart");
  //     return;
  //   }
  //   document.querySelector(".cart-number").innerText =
  //     parseInt(document.querySelector(".cart-number").innerText) + 1;
  //   const cart_item = document.createElement("div");
  //   cart_item.classList.add("cart-row");
  //   cart_item.setAttribute("id", `in-cart-${id}`);
  //   total_cart_price = parseFloat(total_cart_price) + parseFloat(price);
  //   total_cart_price = total_cart_price.toFixed(2);
  //   document.querySelector("#total-value").innerText = `${total_cart_price}`;
  //   cart_item.innerHTML = `
  //       <span class='cart-item cart-column'>
  //       <img class='cart-img' src="${img_src}" alt="">
  //           <span>${name}</span>
  //   </span>
  //   <span class='cart-price cart-column'>${price}</span>
  //   <span class='cart-quantity cart-column'>
  //       <input type="text" value="1">
  //       <button>REMOVE</button>
  //   </span>`;
  //   cart_items.appendChild(cart_item);

  //   const container = document.getElementById("container");
  //   const notification = document.createElement("div");
  //   notification.classList.add("notification");
  //   notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
  //   container.appendChild(notification);
  //   setTimeout(() => {
  //     notification.remove();
  //   }, 2500);
  // }
  if (
    e.target.className == "cart-btn-bottom" ||
    e.target.className == "cart-bottom" ||
    e.target.className == "cart-holder"
  ) {
    // getCartDetails();
    showProductsInCart();
    // axios.get("http://localhost:4000/cart")
    // .then(cartProducts=>{
    //   console.log(cartProducts.data);
    //   showProductsInCart(cartProducts.data);
    //   document.querySelector("#cart").style = "display:block;";
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
  }
  if (e.target.className == "cancel") {
    document.querySelector("#cart").style = "display:none;";
  }
  if (e.target.className == "purchase-btn") {
    if (parseInt(document.querySelector(".cart-number").innerText) === 0) {
      alert("You have Nothing in Cart , Add some products to purchase !");
      return;
    }
    alert("Thanks for the purchase");
    cart_items.innerHTML = "";
    document.querySelector(".cart-number").innerText = 0;
    document.querySelector("#total-value").innerText = `0`;
  }

  if (e.target.innerText == "REMOVE") {
    let total_cart_price = document.querySelector("#total-value").innerText;
    total_cart_price =
      parseFloat(total_cart_price).toFixed(2) -
      parseFloat(
        document.querySelector(
          `#${e.target.parentNode.parentNode.id} .cart-price`
        ).innerText
      ).toFixed(2);
    document.querySelector(".cart-number").innerText =
      parseInt(document.querySelector(".cart-number").innerText) - 1;
    document.querySelector(
      "#total-value"
    ).innerText = `${total_cart_price.toFixed(2)}`;
    e.target.parentNode.parentNode.remove();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:4000/products").then((data) => {
    console.log(data);
    if (data.request.status === 200) {
      const parentSection = document.getElementById("products");
      const products = data.data.products;
      products.forEach((product) => {
        const productHtml = `<div>
        <h1>${product.title} </h1>
        <img src=${product.imageUrl} ></img>
        <button onClick="addToCart(${product.id})">Add to cart</button>
      </div>`;
        parentSection.innerHTML += productHtml;
      });
    }
  });
});

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
  .catch(err=> notifyUsers(err))
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




function addToCart(productId) {
  console.log(productId,'');
  axios
    .post("http://localhost:4000/cart", { productId: productId })
    .then((response) => {
      if (response.status === 200) {
        notifyUsers(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((errMsg) => {
      console.log(errMsg);
      notifyUsers(errMsg);
    });
}

// function getCartDetails() {
//   axios
//     .get("http://localhost:4000/cart")
//     .then((response) => {
//       if (response.status === 200) {
//         response.data.products.forEach(product => {
//           const cartContainer = document.getElementById("cart");
//           cartContainer.innerHTML += `<li>${product.title} -${product.cartItem.quantity} - ${product.price} </li>`;
//         });
//         document.querySelector("#cart").style = "display:block;";
//       }else{
//         throw new Error('Something went wrong')
//       }

//       console.log(response.data);
//     })
//     .catch((err) => {
//       notifyUsers(err);
//     });
// }

function showProductsInCart() {
  axios
  .get("http://localhost:4000/cart")

  .then((response) => {
    console.log(response,'check')
    if (response.status === 200) {
      let parentElement =document.getElementById('cart-items');
      let output='';
      response.data.products.forEach(product => {
        // console.log(product);
        const id = `${product.id}`;
        // console.log(id);
        const title = `${product.title} `;
        const img_src = `${product.imageUrl}`;
        const price = product.price;
        const qnty = product.cartItem.quantity;
        // const cart_item = document.createElement("div");
        // cart_item.classList.add("cart-row");
        // cart_item.setAttribute("id", `in-cart-${id}`);

        output+= `
             <span class='cart-item cart-column'>
             <img class='cart-img' src="${img_src}" alt="">
                 <span>${title}</span>
             </span>
             <span class='cart-price cart-column'>${price}</span>
             <form onsubmit='deleteCartItem(event, ${product.id})' class='cart-quantity cart-column'>
                 <input type="text" value="${qnty}"> 
                 <button>REMOVE</button>
             </form>`;
        // cart_items.appendChild(cart_item);
      });
      parentElement.innerHTML=output;
    }
    document.querySelector("#cart").style = "display:block;";
  });
  //  console.log(listofproducts.products[0].id);
  //  const qnty = listofproducts.products[0].cartItem.quantity;
  //  console.log(qnty);
  // console.log(listofproducts);
  //    cart_items.innerHTML = "";

  //    for(let i=0;i<listofproducts.products.length;i++){
  //        const id = `album-${listofproducts.products[i].id}`;
  //        const name = `${listofproducts.products[i].title} `;
  //        const img_src = `${listofproducts.products[i].imageUrl}`;
  //        const price = listofproducts.products[i].price;
  //        const qnty = listofproducts.products[i].cartItem.quantity;

  //        const cart_item = document.createElement('div');
  //        cart_item.classList.add('cart-row');
  //        cart_item.setAttribute('id',`in-cart-${id}`);

  //        cart_item.innerHTML = `
  //            <span class='cart-item cart-column'>
  //            <img class='cart-img' src="${img_src}" alt="">
  //                <span>${name}</span>
  //            </span>
  //            <span class='cart-price cart-column'>${price}</span>
  //            <form onsubmit='deleteCartItem(event, ${listofproducts.products[i].id})' class='cart-quantity cart-column'>
  //                <input type="text" value="${qnty}">
  //                <button>REMOVE</button>
  //            </form>`
  //        cart_items.appendChild(cart_item)
}
//  }

function notifyUsers(message) {
  const container = document.getElementById("container");
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h4>${message}`;
  container.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2500);
}
