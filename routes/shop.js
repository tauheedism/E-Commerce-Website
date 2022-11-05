const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get('/', shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get('/limited', shopController.getIndexPagination);

router.post("/cart", shopController.postCart);

router.post('/CreateOrder',shopController.postOrder)

router.delete("/cart-delete-item/:id", shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/CreateOrder',shopController.postOrder)

module.exports = router;
