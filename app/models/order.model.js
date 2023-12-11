// kita akan membuat schema dari order
module.exports = mongoose => {
  const schema = mongoose.Schema({
    // user id kita set ke number
    user_id: Number,
    // kita masukkan kedalam tipe data array dan kita konversi ke string
    cart_items: [String]
  })

  schema.method("toJSON", function(){
    const{
      __v,
      _id,
      ...object
    } = this.toObject()
    object.id = _id;
    return object
  })
  // definisikan , bahwa schema diatas dimiliki ole collection order di dalam mongodb
  const Order = mongoose.model("orders", schema)
  return Order
}