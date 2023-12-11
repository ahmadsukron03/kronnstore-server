module.exports = (app) => {
  const orders = require("../controllers/order.controller")
  const router = require("express").Router()

  router.get("/user/:id", orders.findCart)
  router.post('/update/user/:id', orders.addToCart)
  router.delete("/delete/user/:id/product/:code", orders.removeFromCart)

  // kita akan gunakan api/orders
  app.use("/api/orders", router)
};
