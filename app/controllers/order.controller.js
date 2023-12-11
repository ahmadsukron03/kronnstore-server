const db = require('../models')
const Order = db.orders

exports.findCart = (req, res) => {
  // pada id kita konversi ke number
  const id = Number(req.params.id)

  // match ini seperti where pada sql, kita akan mencari user id nya yang sama
  Order.aggregate([{
    $match: {
      user_id: id
    }
  }, {
    // lookup , cari data dari collection product
    $lookup: {
      from: "products",
      localField: "cart_items",
      foreignField: "code",
      as: "products"
    }
  }])
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message || "Some error while retrieving order."
    });
  });
}

exports.addToCart = (req,res) => {
  // data id ini data user id 
  const id = Number(req.params.id)
  // mengirimkan data json ke req.body
  const productCode = String(req.body.product)
  // update data yang kita dapatkan
  Order.updateOne({
    user_id: id
  },{
    // kita tidak boleh mengisikan duplicate value kita menggunakan :
    $addToSet: {
      cart_items: productCode
    }
  })
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message
    });
  });
}

exports.removeFromCart = (req,res) => {
  // data id ini data user id 
  const id = Number(req.params.id)
  // mengirimkan data json ke req.params
  const productCode = String(req.params.product)
  // update data yang kita dapatkan
  Order.updateOne({
    user_id: id
  },{
    // kita akan menggunakan pull
    $pull: {
      cart_items: productCode
    }
  })
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message
    });
  });
}
