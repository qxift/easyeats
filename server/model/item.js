const {Schema, model} = require('mongoose')

const itemSchema = new Schema({
  name: String,
  amount: Number,
  unit: String,
  image: String
})

const item = model('Item', itemSchema);

module.exports = item;
