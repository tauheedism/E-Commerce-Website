window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:4000/orders")
    .then(response =>{
        console.log(response)
       let purchase = document.getElementById('purchase')
       for(let i =0;i<response.data.products.length;i++)
       {
      

        for(let j=0;j<response.data.products[i].products.length;j++)
        {
          
           purchase.innerHTML+=`<div>
           orderid:${response.data.products[i].id}-${response.data.products[i].products[j].price} -
           <img src=${response.data.products[i].products[j].imageUrl} width="100">

           </div>`
        }
    }
     
    })
    .catch(err => console.log(err))
 })