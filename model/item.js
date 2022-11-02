const {Schema, model} = require('mongoose')

const itemSchema = new Schema({
  name: String
})

const item = model('Item', itemSchema);

module.exports = item;
