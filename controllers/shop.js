const Products=require('../models/product');
const cart=require('../models/cart');
const CartItem=require('../models/cart-item');

exports.getProducts = (req, res, next) => {
  Products.findAll()
    .then(products => {
      console.log(products);
      res.status(200).json({products, success:true})
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.status(200).json({success:true , products : products})
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.getIndexPagination = (req, res, next) => {
  let page = Number(req.query.page);
  let Limit = 2;

    Products.findAll({limit:2,offset:Limit*page})
      .then(products => {
        res.json({products , success:true}) 
      })
      .catch(err => {
        console.log(err);
      });
  };


exports.postCart = (req, res, next) => {

  if(!req.body.productId)
  {
    return res.status(400).json({success:false , message:'ProductId is missing'})
  }
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Products.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({ success : true , message:'Successfully added to the cart'});
    })
    .catch(err => 
      res.status(500).json({ success:false,message:err} ))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.id;
    CartItem.findAll({where : {productId: prodId}})
    .then(product => {
      product[0].destroy()
      .then(response =>{
        res.status(200).json({success:true , message:"deleted"})
      })
    })
    .catch(err=>res.json({err}))
};
