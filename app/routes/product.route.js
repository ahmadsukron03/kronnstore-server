module.exports = (app) => {
  const products = require("../controllers/product.controller")
  const router = require("express").Router()

  router.get("/", products.findAll)
  router.get("/:id", products.findOne)

  // kita akan gunakan api/products
  app.use("/api/products", router)
};
